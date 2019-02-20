/*
Functions derived, but changed, from: https://github.com/BitSentinel/CVSS2-Calculator

Author: Andrei Avadanei - CCSIR.org (2015)
Copyright: This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program; if not, see http://www.gnu.org/licenses/.
Thanks to: FIRST.org & NIST CVSS v2.0 Calculator
*/

export class Cvss2Calculator {

  static intFact = 1000;
  // main config for CVSS2
  static config = {
    base: {
      title: 'Base Score Metrics',
      description: 'The base metric group captures the characteristics of a vulnerability that are constant with time and across user environments. The Access Vector, Access Complexity, and Authentication metrics capture how the vulnerability is accessed and whether or not extra conditions are required to exploit it. The three impact metrics measure how a vulnerability, if exploited, will directly affect an IT asset, where the impacts are independently defined as the degree of loss of confidentiality, integrity, and availability. For example, a vulnerability could cause a partial loss of integrity and availability, but no loss of confidentiality.',
      AV: {
        title: 'Access Vector (AV)',
        shortTitle: 'AV',
        description: 'This metric reflects how the vulnerability is exploited. The more remote an attacker can be to attack a host, the greater the vulnerability score.',
        scores: {
          L: {
            title: 'Local',
            shortTitle: 'AV:L',
            description: 'A vulnerability exploitable with only <i>local access</i> requires the attacker to have either physical access to the vulnerable system or a local (shell) account. Examples of locally exploitable vulnerabilities are peripheral attacks such as Firewire/USB DMA attacks, and local privilege escalations (e.g., sudo).',
            score: 0.395
          },
          A: {
            title: 'Adjacent Network',
            shortTitle: 'AV:A',
            description: 'A vulnerability exploitable with <i>adjacent network access</i> requires the attacker to have access to either the broadcast or collision domain of the vulnerable software. Examples of local networks include local IP subnet, Bluetooth, IEEE 802.11, and local Ethernet segment.',
            score: 0.646
          },
          N: {
            title: 'Network',
            shortTitle: 'AV:N',
            description: 'A vulnerability exploitable with <i>network access</i> means the vulnerable software is bound to the network stack and the attacker does not require local network access or local access. Such a vulnerability is often termed “remotely exploitable”. An example of a network attack is an RPC buffer overflow.',
            score: 1
          }
        }
      },
      AC: {
        title: 'Access Complexity (AC)',
        shortTitle: 'AC',
        description: 'This metric measures the complexity of the attack required to exploit the vulnerability once an attacker has gained access to the target system. For example, consider a buffer overflow in an Internet service: once the target system is located, the attacker can launch an exploit at will. <br><br>  Other vulnerabilities, however, may require additional steps in order to be exploited. For example, a vulnerability in an email client is only exploited after the user downloads and opens a tainted attachment. The lower the required complexity, the higher the vulnerability score.',
        scores: {
          H: {
            title: 'High',
            shortTitle: 'AC:H',
            description: 'Specialized access conditions exist. For example: <li>In most configurations, the attacking party must already have elevated privileges or spoof additional systems in addition to the attacking system (e.g., DNS hijacking). </li><li>The attack depends on social engineering methods that would be easily detected by knowledgeable people. For example, the victim must perform several suspicious or atypical actions. </li><li>The vulnerable configuration is seen very rarely in practice. </li><li>If a race condition exists, the window is very narrow.</li>',
            score: 0.35
          },
          M: {
            title: 'Medium',
            shortTitle: 'AC:M',
            description: 'The access conditions are somewhat specialized; the following are examples: <li>The attacking party is limited to a group of systems or users at some level of authorization, possibly untrusted. </li><li>Some information must be gathered before a successful attack can be launched. </li><li>The affected configuration is non-default, and is not commonly configured (e.g., a vulnerability present when a server performs user account authentication via a specific scheme, but not present for another authentication scheme).</li><li>The attack requires a small amount of social engineering that might occasionally fool cautious users (e.g., phishing attacks that modify a web browser’s status bar to show a false link, having to be on someone’s “buddy” list before sending an IM exploit).</li>',
            score: 0.61
          },
          L: {
            title: 'Low',
            shortTitle: 'AC:L',
            description: 'Specialized access conditions or extenuating circumstances do not exist. The following are examples: <li>The affected product typically requires access to a wide range of systems and users, possibly anonymous and untrusted (e.g., Internet-facing web or mail server). </li><li>The affected configuration is default or ubiquitous.  </li><li>The attack can be performed manually and requires little skill or additional information gathering.  </li><li>The \'race condition\' is a lazy one (i.e., it is technically a race but easily winnable). </li>',
            score: 0.71
          }
        }
      },
      Au: {
        title: 'Authentification (Au)',
        shortTitle: 'Au',
        description: 'This metric measures the number of times an attacker must authenticate to a target in order to exploit a vulnerability. This metric does not gauge the strength or complexity of the authentication process, only that an attacker is required to provide credentials before an exploit may occur. The possible values for this metric are listed in Table 3. The fewer authentication instances that are required, the higher the vulnerability score.<br /><br />It is important to note that the Authentication metric is different from Access Vector. Here, authentication requirements are considered <i>once the system has already been accessed</i>. Specifically, for locally exploitable vulnerabilities, this metric should only be setManifest to \'single\' or \'multiple\' if authentication is needed beyond what is required to log into the system. An example of a locally exploitable vulnerability that requires authentication is one affecting a database engine listening on a Unix domain socket (or some other non-network interface). If the user must authenticate as a valid database user in order to exploit the vulnerability, then this metric should be setManifest to \'single.\'',
        scores: {
          M: {
            title: 'Multiple',
            shortTitle: 'Au:M',
            description: 'Exploiting the vulnerability requires that the attacker authenticate two or more times, even if the same credentials are used each time. An example is an attacker authenticating to an operating system in addition to providing credentials to access an application hosted on that system.',
            score: 0.45
          },
          S: {
            title: 'Single',
            shortTitle: 'Au:S',
            description: 'One instance of authentication is required to access and exploit the vulnerability.',
            score: 0.56
          },
          N: {
            title: 'None',
            shortTitle: 'Au:N',
            description: 'Authentication is not required to access and exploit the vulnerability.',
            score: 0.704
          }
        }
      },
      C: {
        title: 'Confidentiality Impact (C)',
        shortTitle: 'C',
        description: 'This metric measures the impact on confidentiality of a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones. Increased confidentiality impact increases the vulnerability score.',
        scores: {
          N: {
            title: 'None',
            shortTitle: 'C:N',
            description: 'There is no impact to the confidentiality of the system.',
            score: 0
          },
          P: {
            title: 'Partial',
            shortTitle: 'C:P',
            description: 'There is considerable informational disclosure. Access to some system files is possible, but the attacker does not have control over what is obtained, or the scope of the loss is constrained. An example is a vulnerability that divulges only certain tables in a database.',
            score: 0.275
          },
          C: {
            title: 'Complete',
            shortTitle: 'C:C',
            description: 'There is total information disclosure, resulting in all system files being revealed. The attacker is able to read all of the system\'s data (memory, files, etc.).',
            score: 0.660
          }
        }
      },
      I: {
        title: 'Integrity Impact (I)',
        shortTitle: 'I',
        description: 'This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and guaranteed veracity of information. Increased integrity impact increases the vulnerability score.',
        scores: {
          N: {
            title: 'None',
            shortTitle: 'I:N',
            description: 'There is no impact to the integrity of the system.',
            score: 0
          },
          P: {
            title: 'Partial',
            shortTitle: 'I:P',
            description: 'Modification of some system files or information is possible, but the attacker does not have control over what can be modified, or the scope of what the attacker can affect is limited. For example, system or application files may be overwritten or modified, but either the attacker has no control over which files are affected or the attacker can modify files within only a limited context or scope.',
            score: 0.275
          },
          C: {
            title: 'Complete',
            shortTitle: 'I:C',
            description: 'There is a total compromise of system integrity. There is a complete loss of system protection, resulting in the entire system being compromised. The attacker is able to modify any files on the target system.',
            score: 0.660
          }
        }
      },
      A: {
        title: 'Availability Impact (A)',
        shortTitle: 'A',
        description: 'This metric measures the impact to availability of a successfully exploited vulnerability. Availability refers to the accessibility of information resources. Attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of a system. Increased availability impact increases the vulnerability score.',
        scores: {
          N: {
            title: 'None',
            shortTitle: 'A:N',
            description: 'There is no impact to the availability of the system.',
            score: 0
          },
          P: {
            title: 'Partial',
            shortTitle: 'A:P',
            description: 'There is reduced performance or interruptions in resource availability. An example is a network-based flood attack that permits a limited number of successful connections to an Internet service.',
            score: 0.275
          },
          C: {
            title: 'Complete',
            shortTitle: 'A:C',
            description: 'There is a total shutdown of the affected resource. The attacker can render the resource completely unavailable.',
            score: 0.660
          }
        }
      }
    },
    temporal: {
      title: 'Temporal Score Metrics',
      description: 'The threat posed by a vulnerability may change over time. Three such factors that CVSS captures are: confirmation of the technical details of a vulnerability, the remediation status of the vulnerability, and the availability of exploit code or techniques. Since temporal metrics are optional they each include a metric value that has no effect on the score. This value is used when the user feels the particular metric does not apply and wishes to "skip over" it.',
      E: {
        title: 'Exploitability (E)',
        shortTitle: 'E',
        description: 'This metric measures the current state of exploit techniques or code availability. Public availability of easy-to-use exploit code increases the number of potential attackers by including those who are unskilled, thereby increasing the severity of the vulnerability. <br /><br /> Initially, real-world exploitation may only be theoretical. Publication of proof of concept code, functional exploit code, or sufficient technical details necessary to exploit the vulnerability may follow. Furthermore, the exploit code available may progress from a proof-of-concept demonstration to exploit code that is successful in exploiting the vulnerability consistently. In severe cases, it may be delivered as the payload of a network-based worm or virus. The more easily a vulnerability can be exploited, the higher the vulnerability score.',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'E:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 1.0
          },
          U: {
            title: 'Unproven that exploit exists',
            shortTitle: 'E:U',
            description: 'No exploit code is available, or an exploit is entirely theoretical.',
            score: 0.85
          },
          POC: {
            title: 'Proof of concept code',
            shortTitle: 'E:POC',
            description: 'Proof-of-concept exploit code or an attack demonstration that is not practical for most systems is available. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.',
            score: 0.9
          },
          F: {
            title: 'Functional exploit exists',
            shortTitle: 'E:F',
            description: 'Functional exploit code is available. The code works in most situations where the vulnerability exists.',
            score: 0.95
          },
          H: {
            title: 'High',
            shortTitle: 'E:H',
            description: 'Either the vulnerability is exploitable by functional mobile autonomous code, or no exploit is required (manual trigger) and details are widely available. The code works in every situation, or is actively being delivered via a mobile autonomous agent (such as a worm or virus).',
            score: 1.0
          }
        }
      },
      RL: {
        title: 'Remediation Level (RL)',
        shortTitle: 'RL',
        description: 'The remediation level of a vulnerability is an important factor for prioritization. The typical vulnerability is unpatched when initially published. Workarounds or hotfixes may offer interim remediation until an official patch or upgrade is issued. Each of these respective stages adjusts the temporal score downwards, reflecting the decreasing urgency as remediation becomes final. The less official and permanent a fix, the higher the vulnerability score is.',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'RL:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 1.0
          },
          OF: {
            title: 'Official Fix',
            shortTitle: 'RL:OF',
            description: 'A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.',
            score: 0.87
          },
          TF: {
            title: 'Temporary Fix',
            shortTitle: 'RL:TF',
            description: 'There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.',
            score: 0.9
          },
          W: {
            title: 'Workaround',
            shortTitle: 'RL:W',
            description: 'There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.',
            score: 0.95
          },
          U: {
            title: 'Unavailable',
            shortTitle: 'RL:U',
            description: 'There is either no solution available or it is impossible to apply.',
            score: 1.0
          }
        }
      },
      RC: {
        title: 'Report Confidence (RC)',
        shortTitle: 'RC',
        description: 'This metric measures the degree of confidence in the existence of the vulnerability and the credibility of the known technical details. Sometimes, only the existence of vulnerabilities are publicized, but without specific details. The vulnerability may later be corroborated and then confirmed through acknowledgement by the author or vendor of the affected technology. The urgency of a vulnerability is higher when a vulnerability is known to exist with certainty. This metric also suggests the level of technical knowledge available to would-be attackers.  The more a vulnerability is validated by the vendor or other reputable sources, the higher the score.',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'RC:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 1.0
          },
          UC: {
            title: 'Unconfirmed',
            shortTitle: 'RC:UC',
            description: 'There is a single unconfirmed source or possibly multiple conflicting reports. There is little confidence in the validity of the reports. An example is a rumor that surfaces from the hacker underground.',
            score: 0.9
          },
          UR: {
            title: 'Uncorroborated',
            shortTitle: 'RC:UR',
            description: 'There are multiple non-official sources, possibly including independent security companies or research organizations. At this point there may be conflicting technical details or some other lingering ambiguity.',
            score: 0.95
          },
          C: {
            title: 'Confirmed',
            shortTitle: 'RC:C',
            description: 'The vulnerability has been acknowledged by the vendor or author of the affected technology. The vulnerability may also be "Confirmed: when its existence is confirmed from an external event such as publication of functional or proof-of-concept exploit code or widespread exploitation.',
            score: 1.0
          }
        }
      }
    },
    environmental: {
      title: 'Environmental Score Metrics',
      description: 'Different environments can have an immense bearing on the risk that a vulnerability poses to an organization and its stakeholders. The CVSS environmental metric group captures the characteristics of a vulnerability that are associated with a user\'s IT environment. Since environmental metrics are optional they each include a metric value that has no effect on the score. This value is used when the user feels the particular metric does not apply and wishes to \'skip over\' it.',
      CDP: {
        title: 'Collateral Damage Potential (CDP)',
        shortTitle: 'CDP',
        description: 'This metric measures the potential for loss of life or physical assets through damage or theft of property or equipment. The metric may also measure economic loss of productivity or revenue. Naturally, the greater the damage potential, the higher the vulnerability score. ',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'CDP:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 0
          },
          N: {
            title: 'None',
            shortTitle: 'CDP:N',
            description: 'There is no potential for loss of life, physical assets, productivity or revenue.',
            score: 0
          },
          L: {
            title: 'Low (light loss)',
            shortTitle: 'CDP:L',
            description: 'A successful exploit of this vulnerability may result in slight physical or property damage. Or, there may be a slight loss of revenue or productivity to the organization.',
            score: 0.1
          },
          LM: {
            title: 'Low-Medium',
            shortTitle: 'CDP:LM',
            description: 'A successful exploit of this vulnerability may result in moderate physical or property damage. Or, there may be a moderate loss of revenue or productivity to the organization.',
            score: 0.3
          },
          MH: {
            title: 'Medium-High',
            shortTitle: 'CDP:MH',
            description: 'A successful exploit of this vulnerability may result in significant physical or property damage or loss. Or, there may be a significant loss of revenue or productivity.',
            score: 0.4
          },
          H: {
            title: 'High (catastrophic loss)',
            shortTitle: 'CDP:H',
            description: 'A successful exploit of this vulnerability may result in catastrophic physical or property damage and loss. Or, there may be a catastrophic loss of revenue or productivity.',
            score: 0.5
          }
        }
      },
      TD: {
        title: 'Target Distribution (TD)',
        shortTitle: 'TD',
        description: 'This metric measures the proportion of vulnerable systems. It is meant as an environment-specific indicator in order to approximate the percentage of systems that could be affected by the vulnerability. The possible values for this metric are listed in Table 11. The greater the proportion of vulnerable systems, the higher the score.',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'TD:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric. ',
            score: 1.0
          },
          N: {
            title: 'None [0%]',
            shortTitle: 'TD:N',
            description: 'No target systems exist, or targets are so highly specialized that they only exist in a laboratory setting. Effectively 0% of the environment is at risk.',
            score: 0
          },
          L: {
            title: 'Low [0-25%]',
            shortTitle: 'TD:L',
            description: 'Targets exist inside the environment, but on a small scale. Between 1% - 25% of the total environment is at risk.',
            score: 0.25
          },
          M: {
            title: 'Medium [26-75%]',
            shortTitle: 'TD:M',
            description: 'Targets exist inside the environment, but on a medium scale. Between 26% - 75% of the total environment is at risk.',
            score: 0.75
          },
          H: {
            title: 'High [76-100%]',
            shortTitle: 'TD:H',
            description: 'Targets exist inside the environment on a considerable scale. Between 76% - 100% of the total environment is considered at risk.',
            score: 1.0
          }
        }
      },
      CR: {
        title: 'Confidentiality Requirement (CR)',
        shortTitle: 'CR',
        description: 'This metric enable the analyst to customize the CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of confidentiality, integrity, and availability, That is, if an IT asset supports a business function for which availability is most important, the analyst can assign a greater value to availability, relative to confidentiality and integrity. ',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'CR:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 1.0
          },
          L: {
            title: 'Low',
            shortTitle: 'CR:L',
            description: 'Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 0.5
          },
          M: {
            title: 'Medium',
            shortTitle: 'CR:M',
            description: 'Loss of Confidentiality is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 1.0
          },
          H: {
            title: 'High',
            shortTitle: 'CR:H',
            description: 'Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 1.51
          }
        }
      },
      IR: {
        title: 'Integrity Requirement (IR)',
        shortTitle: 'IR',
        description: 'This metric enable the analyst to customize the CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of confidentiality, integrity, and availability, That is, if an IT asset supports a business function for which availability is most important, the analyst can assign a greater value to availability, relative to confidentiality and integrity. ',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'IR:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 1.0
          },
          L: {
            title: 'Low',
            shortTitle: 'IR:L',
            description: ' Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 0.5
          },
          M: {
            title: 'Medium',
            shortTitle: 'IR:M',
            description: 'Loss of Integrity is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 1.0
          },
          H: {
            title: 'High',
            shortTitle: 'IR:H',
            description: 'Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 1.51
          }
        }
      },
      AR: {
        title: 'Availability Requirement (AR)',
        shortTitle: 'AR',
        description: 'This metric enable the analyst to customize the CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of confidentiality, integrity, and availability, That is, if an IT asset supports a business function for which availability is most important, the analyst can assign a greater value to availability, relative to confidentiality and integrity. ',
        scores: {
          ND: {
            title: 'Not Defined',
            shortTitle: 'AR:ND',
            description: 'Assigning this value to the metric will not influence the score. It is a signal to the equation to skip this metric.',
            score: 1.0
          },
          L: {
            title: 'Low',
            shortTitle: 'AR:L',
            description: 'Loss of availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 0.5
          },
          M: {
            title: 'Medium',
            shortTitle: 'AR:M',
            description: 'Loss of availability is likely to have a serious adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 1.0
          },
          H: {
            title: 'High',
            shortTitle: 'AR:H',
            description: 'Loss of availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).',
            score: 1.51
          }
        }
      }
    }

  };

  // computes the scores based on the internal object of CVSS2
  static computeScoresFromObject(obj) {
    // check if base object is valid and has all the info required initialized
    if (!this.isObjectValid(obj)) {
      return null;
    }

    let scores = {
      baseScore: -1,
      impactScore: 0,
      exploitabilitySubScore: 0,
      temporalScore: -1,
      environmentalScore: -1,
      adjustedImpactScore: 0,
      adjustedTemporal: 0,
      adjustedBaseScore: 0,
      overallScore: -1
    };

    // Impact = 10.41*(1-(1-ConfImpact)*(1-IntegImpact)*(1-AvailImpact))
    scores.impactScore = 10.41 * this._mkFact(this._mkInt(1.0) - this._mkInt(this._mkFact(this._mkInt(1.0) - this._mkInt(this._getMetricScoreFloat(obj, 'C'))) * this._mkFact(this._mkInt(1.0) - this._mkInt(this._getMetricScoreFloat(obj, 'I'))) * this._mkFact(this._mkInt(1.0) - this._mkInt(this._getMetricScoreFloat(obj, 'A')))));

    // Exploitability = 20* AccessVector*AccessComplexity*Authentication
    scores.exploitabilitySubScore = 20.0 * this._getMetricScoreFloat(obj, 'AC') * this._getMetricScoreFloat(obj, 'Au') * this._getMetricScoreFloat(obj, 'AV');

    // BaseScore = round_to_1_decimal(((0.6*Impact)+(0.4*Exploitability)-1.5)*f(Impact))
    // where f(impact)= 0 if Impact=0, 1.176 otherwise

    scores.baseScore = this._quickRound(this._mkFact(this._mkInt(0.6 * scores.impactScore) + this._mkInt(0.4 * scores.exploitabilitySubScore) - this._mkInt(1.5)) * this._fImpact(scores.impactScore));

    /* Only calculating Temporal if an option was chose */
    if (obj.temporal['E'] || obj.temporal['RL'] || obj.temporal['RC']) {
      // TemporalScore = round_to_1_decimal( BaseScore * Exploitability * RemediationLevel * ReportConfidence )
      scores.temporalScore = this._quickRound(scores.baseScore * this._getMetricScoreFloat(obj, 'E') * this._getMetricScoreFloat(obj, 'RL') * this._getMetricScoreFloat(obj, 'RC'));
    }

    /* Only calculating Environmental if an option was chose */
    if (obj.environmental['CDP'] || obj.environmental['TD'] || obj.environmental['CR'] || obj.environmental['IR'] || obj.environmental['AR']) {
      // AdjustedImpact = Min(10, 10.41 * (1 - (1 - ConfImpact * ConfReq) * (1 - IntegImpact * IntegReq) * (1 - AvailImpact * AvailReq)))
      scores.adjustedImpactScore = Math.min(10, 10.41 * this._mkFact(this._mkInt(1.0) - this._mkInt(this._mkFact(this._mkInt(1.0) - this._mkInt(this._getMetricScoreFloat(obj, 'C') * this._getMetricScoreFloat(obj, 'CR'))) * (this._mkFact(this._mkInt(1.0) - this._mkInt(this._getMetricScoreFloat(obj, 'I') * this._getMetricScoreFloat(obj, 'IR'))) * this._mkFact(this._mkInt(1.0) - this._mkInt(this._getMetricScoreFloat(obj, 'A') * this._getMetricScoreFloat(obj, 'AR')))))));

      // AdjustedBaseScore = _quickRound((0.6 * AdjustedImpact + 0.4 * Exploitability - 1.5) * f(Impact))
      scores.adjustedBaseScore = Cvss2Calculator._quickRound(this._mkFact(this._mkInt(0.6 * scores.adjustedImpactScore) + this._mkInt(0.4 * scores.exploitabilitySubScore) - this._mkInt(1.5)) * Cvss2Calculator._fImpact(scores.impactScore));

      // AdjustedTemporal = TemporalScore recomputed with the BaseScore's Impact sub-equation replaced with the AdjustedImpact equation
      // AdjustedTemporal = _quickRound(AdjustedBaseScore * Exploitability * RemediationLevel * ReportConfidence)
      scores.adjustedTemporal = Cvss2Calculator._quickRound(scores.adjustedBaseScore * this._getMetricScoreFloat(obj, 'E') * this._getMetricScoreFloat(obj, 'RL') * this._getMetricScoreFloat(obj, 'RC'));

      // EnvironmentalScore = _quickRound((AdjustedTemporal + (10 - AdjustedTemporal) * CollateralDamagePotential) * TargetDistribution)
      scores.environmentalScore = Cvss2Calculator._quickRound(this._mkFact(this._mkInt(scores.adjustedTemporal) + this._mkInt(this._mkFact(this._mkInt(10) - this._mkInt(scores.adjustedTemporal)) * this._getMetricScoreFloat(obj, 'CDP'))) * this._getMetricScoreFloat(obj, 'TD'));
    }

    /*
            Overall CVSS Score is something imported from NVD and it just takes the
            most defined score. If there is no Environmental or Temporal score defined but
            there is a Base Score then the Overall Score is the Base Score. If the
            Environmental Score is defined then the Overall Score will be the
            Environmental Score otherwise if only the Temporal Score is
            defined then the Overall Score will be the Temporal Score.
        */

    if (scores.baseScore >= 0) {
      scores.overallScore = scores.baseScore;
      if (scores.environmentalScore >= 0) {
        scores.overallScore = scores.environmentalScore;
      } else if (scores.temporalScore >= 0) {
        scores.overallScore = scores.temporalScore;
      }
    }

    for (let score in scores) {
      // noinspection JSUnfilteredForInLoop
      scores[score] = this._quickRound(scores[score]);
    }

    return scores;
  }

  // basic check to see if an object is valid
  static isObjectValid(obj) {
    if (!('base' in obj)) {
      return false;
    }

    for (let key in this.config.base) {
      if (!this.config.base.hasOwnProperty(key)) continue;
      if (key === 'title') continue;
      if (key === 'description') continue;

      if (!(key in obj.base)) {
        return false;
      }
    }

    return true;
  }

  // EX: AV:A/AC:H/Au:N/C:N/I:C/A:C/E:F/RL:ND/RC:ND
  static vectorToObject(vector) {
    if (!vector.length || vector.indexOf('/') === -1) {
      throw new Error('Invalid string.');
    }
    vector = vector.split('/');

    let obj = this._getCVSSv2Obj();
    for (let i = 0; i < vector.length; i++) {
      const metric = this._stringToMetric(vector[i]);
      let metricCategory = this._getMetricCategory(metric, true);

      obj[metricCategory][metric.name] = metric.val;
    }

    return obj;
  }

  // return something like: AV:A/AC:H/Au:N/C:N/I:C/A:C/E:F/RL:ND/RC:ND
  // noinspection JSUnusedGlobalSymbols
  static objectToVector(obj) {
    let vector = '';

    /// add base
    for (let baseKey in obj.base) {
      if (obj.base.hasOwnProperty(baseKey)) {
        vector += baseKey + ':' + obj.base[baseKey] + '/';
      }
    }

    for (let temporalKey in obj.temporal) {
      if (obj.temporal.hasOwnProperty(temporalKey)) {
        if (obj.temporal[temporalKey] === 'ND') { // Not Defined
          continue;
        }
        vector += temporalKey + ':' + obj.temporal[temporalKey] + '/';
      }
    }

    for (let environmentalKey in obj.environmental) {
      if (obj.environmental.hasOwnProperty(environmentalKey)) {
        if (obj.environmental[environmentalKey] === 'ND') { // Not Defined
          continue;
        }
        vector += environmentalKey + ':' + obj.environmental[environmentalKey] + '/';
      }
    }

    this.vector = vector.slice(0, -1);
    return this.vector;
  }

  // get basic CVSS2 obj
  static _getCVSSv2Obj() {
    return {base: {}, temporal: {}, environmental: {}};
  }

  // string must have the format of "VECTOR:VALUE"
  static _stringToMetric(value) {
    if (value.indexOf(':') !== -1) {
      value = value.split(':');

      return {name: value[0], val: value[1]};
    } else {
      return {name: value};
    }
  }

  // search a metric in all categories, otherwise throw error
  static _getMetricCategory(metric, lower) {
    if (lower == null) lower = false;

    if (typeof this.config.base[metric.name] === 'object') return lower ? 'base' : 'Base';
    if (typeof this.config.temporal[metric.name] === 'object') return lower ? 'temporal' : 'Temporal';
    if (typeof this.config.environmental[metric.name] === 'object') return lower ? 'environmental' : 'Environmental';

    throw new SyntaxError('Invalid Search Metric Category input.');
  }

  // helper for getting the value from config
  static _getFloatFromConfig(metric) {
    return this.config[metric.category][metric.name].scores[metric.val].score;
  }

  // generate object and return float value from config based on a string. it takes care of temporal and env
  static _getMetricScoreFloat(obj, string) {
    const metric = Cvss2Calculator._stringToMetric(string);
    metric.category = this._getMetricCategory(metric, true);
    metric.val = obj[metric.category][metric.name];

    if (metric.val === null || typeof metric.val === 'undefined') {
      if (metric.category === 'temporal' || metric.category === 'environmental') {
        metric.val = 'ND'; // Not Defined
        return this._getFloatFromConfig(metric);
      }
      throw new Error('Please fill in all base score metrics in order to generate a score!');
    }

    return this._getFloatFromConfig(metric);
  }

  // useful math functions
  static _mkInt(original) {
    return Math.round(original * this.intFact);
  }

  static _mkFact(original) {
    return original / this.intFact;
  }

  /* Rounds to 1 decimal */
  static _quickRound(original) {
    return Math.round(original * 10) / 10;
  }

  /* Possible values for _fImpact, 0 and 1.176  */
  static _fImpact(value) {
    if (value > 0) {
      return 1.176;
    } else {
      return 0;
    }
  }

}

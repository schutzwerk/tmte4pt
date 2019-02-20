<template>
  <div style="margin-bottom: 10px;">
    <b-collapse id="collapse-metric-info" class="mt-2">
      <b-card class="metric-info" border-variant="warning">
        <b-button @click="closeMetricInfo" class="close-metrics" variant="warning">X</b-button>
        <b-tabs pills card v-model="tabIndex">
          <b-tab title="Access Vector" active>
            This metric reflects how the vulnerability is exploited. The possible values for this metric are listed in
            the table below. The more remote an attacker can be to attack a host, the greater the vulnerability score.
            <table class="table b-table table-striped">
              <thead>
              <tr>
                <th>Metric Value</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Local (L)</td>
                <td>A vulnerability exploitable with only <em>local access</em> requires the attacker to have either
                  physical access to the vulnerable system or a local (shell) account. Examples of locally exploitable
                  vulnerabilities are peripheral attacks such as Firewire/USB DMA attacks, and local privilege
                  escalations (e.g., sudo).
                </td>
              </tr>
              <tr>
                <td>Adjacent Network (A)</td>
                <td>A vulnerability exploitable with <em>adjacent network access</em> requires the attacker to have
                  access to either the broadcast or collision domain of the vulnerable software.&nbsp;Examples of local
                  networks include local IP subnet, Bluetooth, IEEE 802.11, and local Ethernet segment.
                </td>
              </tr>
              <tr>
                <td>Network (N)</td>
                <td>A vulnerability exploitable with <em>network access</em> means the vulnerable software is bound to
                  the network stack and the attacker does not require local network access or local access.&nbsp;Such a
                  vulnerability is often termed "remotely exploitable". An example of a network attack is an RPC buffer
                  overflow.
                </td>
              </tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab title="Access Complexity">
            This metric measures the complexity of the attack required to exploit the vulnerability once an attacker has
            gained access to the target system. For example, consider a buffer overflow in an Internet service: once the
            target system is located, the attacker can launch an exploit at will.
            <br/>
            Other vulnerabilities, however, may require additional steps in order to be exploited. For example, a
            vulnerability in an email client is only exploited after the user downloads and opens a tainted attachment.
            The possible values for this metric are listed in the table below. The lower the required complexity, the
            higher the vulnerability score.
            <table class="table b-table table-striped">
              <thead>
              <tr>
                <th>Metric Value</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>High (H)</td>
                <td>Specialized access conditions exist. For example:<br>- In most configurations, the attacking party
                  must already have elevated privileges or spoof additional systems in addition to the attacking system
                  (e.g., DNS hijacking).<br>- The attack depends on social engineering methods that would be easily
                  detected by knowledgeable people. For example, the victim must perform several suspicious or atypical
                  actions.<br>- The vulnerable configuration is seen very rarely in practice.<br>- If a race condition
                  exists, the window is very narrow.
                </td>
              </tr>
              <tr>
                <td>Medium (M)</td>
                <td>The access conditions are somewhat specialized; the following are examples:<br>- The attacking party
                  is limited to a group of systems or users at some level of authorization, possibly untrusted.<br>-
                  Some information must be gathered before a successful attack can be launched.<br>- The affected
                  configuration is non-default, and is not commonly configured (e.g., a vulnerability present when a
                  server performs user account authentication via a specific scheme, but not present for another
                  authentication scheme).<br>- The attack requires a small amount of social engineering that might
                  occasionally fool cautious users (e.g., phishing attacks that modify a web browsers status bar to show
                  a false link, having to be on someones buddy list before sending an IM exploit).
                </td>
              </tr>
              <tr>
                <td>Low (L)</td>
                <td>Specialized access conditions or extenuating circumstances do not exist. The following are examples:<br>-
                  The affected product typically requires access to a wide range of systems and users, possibly
                  anonymous and untrusted (e.g., Internet-facing web or mail server).<br>- The affected configuration is
                  default or ubiquitous.<br>- The attack can be performed manually and requires little skill or
                  additional information gathering.<br>- The race condition is a lazy one (i.e., it is technically a
                  race but easily winnable).
                </td>
              </tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab title="Authentication">
            This metric measures the number of times an attacker must authenticate to a target in order to exploit a
            vulnerability. This metric does not gauge the strength or complexity of the authentication process, only
            that an attacker is required to provide credentials before an exploit may occur. The possible values for
            this metric are listed in the table below. The fewer authentication instances that are required, the higher
            the vulnerability score.
            <table class="table b-table table-striped">
              <thead>
              <tr>
                <th>Metric Value</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Multiple (M)</td>
                <td>Exploiting the vulnerability requires that the attacker authenticate two or more times, even if the
                  same credentials are used each time. An example is an attacker authenticating to an operating system
                  in addition to providing credentials to access an application hosted on that system.
                </td>
              </tr>
              <tr>
                <td>Single (S)</td>
                <td>The vulnerability requires an attacker to be logged into the system (such as at a command line or
                  via a desktop session or web interface).
                </td>
              </tr>
              <tr>
                <td>None (N)</td>
                <td>Authentication is not required to exploit the vulnerability.</td>
              </tr>
              </tbody>
            </table>
            The metric should be applied based on the authentication the attacker requires before launching an attack.
            For example, if a mail server is vulnerable to a command that can be issued before a user authenticates, the
            metric should be scored as "None" because the attacker can launch the exploit before credentials are
            required. If the vulnerable command is only available after successful authentication, then the
            vulnerability should be scored as "Single" or "Multiple," depending on how many instances of authentication
            must occur before issuing the command.
          </b-tab>
          <b-tab title="Confidentiality Impact">
            This metric measures the impact on confidentiality of a successfully exploited vulnerability.
            Confidentiality refers to limiting information access and disclosure to only authorized users, as well as
            preventing access by, or disclosure to, unauthorized ones. The possible values for this metric are listed in
            the table below. Increased confidentiality impact increases the vulnerability score.
            <table class="table b-table table-striped">
              <thead>
              <tr>
                <th>Metric Value</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>None (N)</td>
                <td>There is no impact to the confidentiality of the system.</td>
              </tr>
              <tr>
                <td>Partial (P)</td>
                <td>There is considerable informational disclosure. Access to some system files is possible, but the
                  attacker does not have control over what is obtained, or the scope of the loss is constrained. An
                  example is a vulnerability that divulges only certain tables in a database.
                </td>
              </tr>
              <tr>
                <td>Complete (C)</td>
                <td>There is total information disclosure, resulting in all system files being revealed. The attacker is
                  able to read all of the system's data (memory, files, etc.)
                </td>
              </tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab title="Integrity Impact">
            This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to
            the trustworthiness and guaranteed veracity of information. The possible values for this metric are listed
            in the table below. Increased integrity impact increases the vulnerability score.
            <table class="table b-table table-striped">
              <caption>
              </caption>
              <thead>
              <tr>
                <th>Metric Value</th>
                <th colspan="2">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>None (N)</td>
                <td>There is no impact to the integrity of the system.</td>
              </tr>
              <tr>
                <td>Partial (P)</td>
                <td>Modification of some system files or information is possible, but the attacker does not have control
                  over what can be modified, or the scope of what the attacker can affect is limited. For example,
                  system or application files may be overwritten or modified, but either the attacker has no control
                  over which files are affected or the attacker can modify files within only a limited context or scope.
                </td>
              </tr>
              <tr>
                <td>Complete (C)</td>
                <td>There is a total compromise of system integrity. There is a complete loss of system protection,
                  resulting in the entire system being compromised. The attacker is able to modify any files on the
                  target system.
                </td>
              </tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab title="Availability Impact">
            This metric measures the impact to availability of a successfully exploited vulnerability. Availability
            refers to the accessibility of information resources. Attacks that consume network bandwidth, processor
            cycles, or disk space all impact the availability of a system. The possible values for this metric are
            listed in the table below. Increased availability impact increases the vulnerability score.
            <table class="table b-table table-striped">
              <caption>
              </caption>
              <thead>
              <tr>
                <th>Metric Value</th>
                <th colspan="2">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>None (N)</td>
                <td>There is no impact to the availability of the system.</td>
              </tr>
              <tr>
                <td>Partial (P)</td>
                <td>There is reduced performance or interruptions in resource availability. An example is a
                  network-based flood attack that permits a limited number of successful connections to an Internet
                  service.
                </td>
              </tr>
              <tr>
                <td>Complete (C)</td>
                <td>There is a total shutdown of the affected resource. The attacker can render the resource completely
                  unavailable.
                </td>
              </tr>
              </tbody>
            </table>
          </b-tab>
          <b-tab title="Collateral Damage Potential">
            This metric measures the potential for loss of life or physical assets through damage or theft of property
            or equipment. The metric may also measure economic loss of productivity or revenue. The possible values for
            this metric are listed in the table below. Naturally, the greater the damage potential, the higher the
            vulnerability score.
            <table class="table b-table table-striped">
              <caption>
              </caption>
              <thead>
              <tr>
                <th>Metric Value</th>
                <th colspan="2">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>None (N)</td>
                <td>There is no potential for loss of life, physical assets, productivity or revenue.</td>
              </tr>
              <tr>
                <td>Low (L)</td>
                <td>A successful exploit of this vulnerability may result in slight physical or property damage. Or,
                  there may be a slight loss of revenue or productivity to the organization.
                </td>
              </tr>
              <tr>
                <td>Low-Medium (LM)</td>
                <td>A successful exploit of this vulnerability may result in moderate physical or property damage. Or,
                  there may be a moderate loss of revenue or productivity to the organization.
                </td>
              </tr>
              <tr>
                <td>Medium-High (MH)</td>
                <td>A successful exploit of this vulnerability may result in significant physical or property damage or
                  loss. Or, there may be a significant loss of revenue or productivity.
                </td>
              </tr>
              <tr>
                <td>High (H)</td>
                <td>A successful exploit of this vulnerability may result in catastrophic physical or property damage
                  and loss. Or, there may be a catastrophic loss of revenue or productivity.
                </td>
              </tr>
              <tr>
                <td>Not Defined (ND)</td>
                <td>Assigning this value to the metric will not influence the score. It is a signal to the equation to
                  skip this metric.
                </td>
              </tr>
              </tbody>
            </table>
            Clearly, each organization must determine for themselves the precise meaning of "slight, moderate,
            significant, and catastrophic."
          </b-tab>
          <b-tab title="Common Vulnerability Scoring System">
            <p>The Common Vulnerability Scoring System (CVSS) provides an open framework for communicating the characteristics
            and impacts of IT vulnerabilities. CVSS consists of 3 groups: Base, Temporal and Environmental.
            The Base Score is based on the Exploitability (AV, AC, Au) and Impact (C, I, A).
            For the tool, the Temporal Score is ignored, because it is not needed for penetration testing.
            The Environmental score consists of CDP and Target Distribution.
            When testing automotives, a distribution of 100% is assumed, so that value is also ignored.
            Each group produces a numeric score ranging from 0 to 10, and a Vector, a compressed textual representation
            that reflects the values used to derive the score. The Base group represents the intrinsic qualities of a vulnerability.
            The Temporal group reflects the characteristics of a vulnerability that change over time.
            The Environmental group represents the characteristics of a vulnerability that are unique to any user's environment.
            CVSS enables IT managers, vulnerability bulletin providers, security vendors, application vendors and
              researchers to all benefit by adopting this common language of scoring IT vulnerabilities.</p>
            <p>The colorization of the score is:
              <span class="cvss-0">0.0 - 0.9 </span>,
              <span class="cvss-1">1.0 - 1.9 </span>,
              <span class="cvss-2">2.0 - 2.9 </span>,
              <span class="cvss-3">3.0 - 3.9 </span>,
              <span class="cvss-4">4.0 - 4.9 </span>,
              <span class="cvss-5">5.0 - 5.9 </span>,
              <span class="cvss-6">6.0 - 6.9 </span>,
              <span class="cvss-7">7.0 - 7.9 </span>,
              <span class="cvss-8">8.0 - 8.9 </span>,
              <span class="cvss-9">9.0 - 10.0 </span>
            </p>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
window.metricTabIndex = 0;

export default {
  name: 'MwMetricInfo',
  props: ['tabIndex'],
  methods: {
    closeMetricInfo() {
      document.getElementById('collapse-metric-info').style.display = 'none';
    }
  }
}
</script>

<style>
  div.card-body > table > thead > tr > th:first-child {
    width: 175px;
  }
  .close-metrics{
    position: absolute;
    right: 0;
    top: 0;
  }

  /*noinspection CssUnusedSymbol*/
  .metric-info > .card-body{
    padding-top: 0;
    padding-bottom: 0;
    text-align: left;
  }
</style>

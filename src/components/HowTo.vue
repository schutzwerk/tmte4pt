<template>
  <b-container id="howto">
    <h1>How to use the Tool</h1>
    <h3 class="text-left">Preparations</h3>
    <p class="text-left">This tool is an extension for the Microsoft ThreatModellingTool 2016. Therefore the fist step would be creating a model with it, by using the adapted
      Template from the <a href="https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2016/july/the-automotive-threat-modeling-template/">NCC Group</a>,
      which should be provided with the tool. When the designing of the DFD is finished, a report has to be be created and provided to the tool with the Save file for the next step.</p>
    <h3 class="text-left">Loading/ Parsing of the TMT Files</h3>
    <p class="text-left">On the <router-link to="/">Start/ Homepage</router-link> click on the "Browse" Button, select to correct file, and then click the Load Button.
      If everything worked fine, a <span style="color: #28a745">green</span> outline should appear. In case of an error, the outline is <span style="color: #dc3545">red</span>.
      Be careful and select the correct file, the Report file should have the ending "*.htm" file, and the Save File the ending "*.tm7".
      By loading the files, they get parsed and the relevant data is extracted and displayed at the other pages.</p>
    <h3 class="text-left">Loading of a Json Save file from this tool</h3>
    <p class="text-left">When the Data or Filter is Saved, a "*.json" file is created. Each of those files can be loaded as the other files above.
    The data inside the Json file will overwrite the existing data in the tool.</p>
    <h3 class="text-left">Threat Table</h3>
    <p class="text-left">This table will simply display all threats parsed from the report file, but the default threat-type values of the Cvss2 have been assigned to each threat.
      These values can be individually changed by the user. If you want to change more than one threat at once, use the tab <router-link to="/modifythreats">Modify Threats</router-link>
      or <router-link to="/threattypes">ThreatTypes</router-link>.
      To find more about the meaning of the Cvss2 metrics (e.g. AC or I), simply click on the name/ text. Each column (except Info) can be sorted in alphanumeric order.
      By clicking on "More" in the Info column, more information will be displayed.
      The table can be filtered by the input of the filter textfield (see Filtering). To change to number of threats displayed on each Page change the value in the dropdown box.
      The default value is 5 for better performance. With the paging on the top and bottom of the table, you can navigate between the pages.</p>
    <h3 class="text-left">Filtering</h3>
    <p class="text-left">Click on the <span style="color: #ffc107">yellow</span>"?" next to the Filter for detailed information.
      With the filtering and sorting of the tabular data, it is possible for a penetration tester to find the threats which match his/her criteria and therefore helps him prioritising.
      e.g. the tester wants to find the threats with the highest Cvss2 Score which have "Ethernet" as Interaction and the Access Vector is "Local (L)".</p>
    <h3 class="text-left">Tabs in the Navbar</h3>
    <p class="text-left"><router-link to="/">"TMTe4PT"</router-link> is the abbreviation of the name of the tool
    (Threat Modelling Tool extension for Penetration Tester). By clicking on it, the user will arrive on the Start-/Homepage.</p>
    <p class="text-left"><router-link to="/allthreats">"All Threats"</router-link> is only for an overview of all the threats parsed from the report file with the option
    to filter through them. Additionally the metric values of the Cvss2 Score can be changed for each threat individually.
      If you click on "More" in the Info column and then on the id, you will be navigated to "ThreatTypes" with the ID in the filter, therefore seeing only this type.</p>
    <p class="text-left"><router-link to="/modifythreats">"Modify Threats"</router-link> is like "All Threats", but with an added option
      to bulk change all displayed threats at once. Therefore the user can set the Cvss2 values in the boxes over the table and click "Apply to displayed threats".
    Then the values will be set to all threats displayed. If the user has set no filter, it will be applied to all threats.
      If the user used an filter and the number of threats has been reduced, only the displayed threats get the new values.
    If one metric is left blank, no value will be applied. To clear the selection, click on the metric name (e.g. "AV).
    With the button "Merge 2-way Flows, all threats which have the same flow (interaction) and go in both directions will be merged. e.g. ACC &lt;-&gt; Gateway</p>
    <p class="text-left"><router-link to="/threattypes">"ThreatTypes"</router-link> will display all threat types parsed out of the save file.
    The threat-types are the rules set in the MS TMT Template. The Cvss2 Metrics are the default values set in the MS TMT Templates.
    On this tab, the user has the option to quickly change the Cvss2 values of each threat type and by clicking the button
    "Apply to all threats", setting the values to each threat of this type/ each threat fitting the rule of the template.
    If you click on "More" in the Info column and then on the id, you will be navigated to "AllThreats" with the ID in the filter, therefore seeing all threats for this type.</p>
    <p class="text-left"><router-link to="/systemoverview">"SystemOverview"</router-link> will display the image of the DFD which was
    gained from the report file. By hovering over the image, a magnifier will appear, zooming in on the specific location.
    Additionally the user can view the image in original size in a new tab by clicking on "Click to open the image in new Tab".</p>
    <h3 class="text-left">Dropdowns in the Navbar</h3>
    <p class="text-left">Under "Temp" the user has the possibility to store the current data and the input of all filters
    temporarily in the cache of the browser. Closing the browser will erase the temporary data. After storing it to the cache,
    the user can make changes to the data to test something, and then load the previous data out of the cache.
      By loading the previously saved data out of the cache, the whole current data will be overwritten.</p>
    <p class="text-left">With the "Clear" options, either the current data, or all filters, or both can be cleared.
      If the data has not been saved, it will be lost.</p>
    <p class="text-left">The "Save" menu gives the user the ability to, either save the current data, or save the input of all filters, or both.
      Each will be saved in a different file with a predefined filename.</p>
  </b-container>

</template>

<script>
export default {
  name: 'MwHowto'
};
</script>

<style>

</style>

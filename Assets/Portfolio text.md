Navigation Modernization
Microsoft Advertising ‧ Q1 2024  
Microsoft Monetize/Curate ‧ Q1 2025  
Lead / Solo designer for Navigation, other designers for Onboarding/Dashboard updates
---



Core driver
Merge SMB-focused Smart mode back into main Expert experience, as experiment maintaining separate modes did not yield  high enough ROI.



##### Issues discovered from audit/user DSAT



\[Navigation - Main 1 - Full size tools]  
Overloaded navigation patterns (i.e. “Tools” junk drawer, global navigation)



\[Navigation - Main 2 - Object-scope-hierarchy-confusion]  
Object scope/hierarchy confusion/duplication (All / Campaign / Ad group)



Additional Goals
Reduce cognitive load for SMB users without limiting expert workflows  
Maintain familiarity for users also using Google Ads  
Align with Microsoft Fluent 2 design system  
Enable future cross-product scalability



##### Key design decisions

\[Navigation - Main 3 - Different-User-Tool-Settings]  
\[Navigation - Main 4 - Browse Tools Dialog]  
Replaced “Tools” junk drawer with customizable tools list on left

* Utilize onboarding data collected to prepopulate relevant tools
* Improved discoverability of frequently used and new features



\[Navigation - Main 5 - Scope]  
Merged scope and context together for less duplication in UI

* Most balanced discoverability vs visual complexity option found through usability testing
* Enabled dropdown-based access to campaign hierarchies, fallback of pinning pane for expert users  
\[View iteration examples button]



\[Navigation - Main 6 - Dynamic Interaction Model]  
Enabled dynamic interaction models depending on account hierarchy to remove visual complexity if not needed

* SMB users - single performance max campaign
* Expert users - multi-level breadcrumb forming scope with all campaigns pages



\[Navigation - Main 7 - Returntooldui]  
Created rollback settings for pilot

* Allowed users to temporarily revert to legacy navigation
* Reduced CSAT risk during rollout if any issues remained after user testing



Impact
5-star reviews increased from 56% → 69% during pilot  
Search usage increased from 0.54% → 11.7% from fixing overloaded global navigation  
Switch-back rate remained at 1% while offered  
Kicked off extension of central company design system specific for our enterprise monetization products



\[Navigation - Main 8 - Xandr Navigation updates]  
Scalable component enabled rapid Monetize and Curate implementation

* Reduced design timeline by one month for cross product reuse
* Able to delegate product specific work to another designer with light supervision/guidance



LinkedIn post from Microsoft Advertising user  
\[linkedin embed]



\[Microsoft Advertising button]



##### Review next project

\[Table Page Modernization button]



# Scope design iterations

##### Dropdowns header

\[Navigation - Modal 1 - Dropdowns Header]

The Initial design was based on a new scope-handling pattern Google Ads was testing. After testing Google's UI with Google Ads users, I found issues with the concept.

1. Complex multi-element header caused ‘banner blindness’. Users skipped over it.
2. The pattern mixed mental models too much - the dropdowns no longer look like the breadcrumb they are intending to emulate, and the view filter at the start isn’t even a location.



##### Merge into secondary navigation

\[Navigation - Modal 2 - Merge into secondary 1]

\[Navigation - Modal 3 - Merge into secondary 2]

Another design explored getting rid of the scope bar from the content area entirely, and merging it into the secondary navigation. After testing this plus Google Ads’s older navigation, I found additional issues with this concept.

1. Visual hierarchy did not match users expectations. Users skipped over this iteration of the scope and did not understand what it was or that it would affect the page area.
2. The progressive disclosure pattern used failed to communicate the browsing experience available for scope.



##### Collapse filters and supportive information

\[Navigation - Modal 4 - Collapse Filters 1]

\[Navigation - Modal 5 - Collapse Filters 2]

\[Navigation - Modal 6 - Collapse Filters 3]

While tightening up the final scope bar concept, I also tested user’s reactions to collapsed filters and supportive information. Feedback was that users wanted to see an actual summary of applied global filters, and most users didn’t change any of the elevated meta data displayed in the info area, so that was removed from the final design.





Table Page Modernization
Microsoft Advertising ‧ Pilot ongoing  
Microsoft Monetize ‧  Q2 2025  
Solo / Lead designer for Table Page, other designer for Navigation refinements
---



Core driver
Refactor and componentize table pages based on Fluent 2 style/tokens as part of Microsoft Advertising UX Refresh initiative focused on increasing user CSAT / announcement at marketing event in Cannes for demoing new AI functionality in April 2026.



##### Issues discovered from audit/user DSAT


\[Table - Main 1 - Table Issues 1]  
Visually noisy (color, alignment, spacing, typography, component appearances)



\[Table - Main 2 - Statushovers]  
Interaction inconsistencies

For example, dashed underlines usage not all having hover interactions



\[Table - Main 3 - Table Issues 3]  
Editing/browsing columns UI cramped



\[Table - Main 4 - Filters-Scattered-Animation]  
Filtering confusion (global vs local, separated, different visuals)



##### Additional goals  

Maintain 70% user retention on UI before rolling out to next phase of users  
Establish design-to-code alignment for components  
Support theme migration for future phase  
Create a solid foundation of decisions for major workflows for MAP UX Refresh rollout



##### Key design decisions



\[Table - Main 5 - Addfilter]  
\[Table - Main 6 - Filtertruncation]  
Consolidated filtering into a single pattern

* Global and local → Non-dismissable and dismissable
* Full bar space to display more applied filters, truncation toggle for user control in different situations  
\[View iteration examples button]



\[Table - Main 7 - Browsecolumns]  
\[Table - Main 8 - Reordercolumns]  
Gave column editing space

* Tree component provides better browsing across groups
* Interaction tag list allows for easy removal and drag and drop to reorder



\[Table - Main 9 - Tablerow]  
Improved visual design of base table components

* True alignment of header text with cell content, cell content with other cell content
* Simplification of cell template content, interactions, actions behavior and when to use



\[Table - Main 10 - Headerbutton]  
Quick actions available via table header cell buttons

* Allows for quick filtering as well as custom column actions
* Drag and drop to reorder in page quickly



##### AI as a Decision-Support Tool  

Evaluating complex table behaviors through static mocks alone creates blind spots in design-to-code fidelity. Many decisions are multifaceted, and reviewing all the combinations can make stakeholders’ eyes glaze over. To fix this, I used AI-assisted interactive prototyping to model complex decisions, such as truncation thresholds and cell resting/hover actions. Rather than coding fully functional table components (which is difficult even for skilled software engineers), I scoped these lightweight, mid-fi prototypes to target specific aspects to visually show trade-offs. Serving as interactive decision-support tools, they enabled stakeholders to evaluate proposed patterns in real time, provide actionable feedback, and increase speed toward a final decision.



###### Action Slot Grid Prototype  

Configure how resting and hover actions are positioned within grid cells  
\[Table - Main 11 - Action Slot Grid]  
\[View cell actions alignment decisioning prototype button]



Impact  
72% retained adoption on new UI for **internal** users (80% increase from low of 40% during initial dogfood)  
94.8% retained adoption on new UI for first 1% of **external** users  
A more modern, scalable, consistent interaction framework that applies to \~80% of the products’ surfaces  
Components created that match code in Figma/Storybook, utilizing tokens that can be rethemed in the future



LinkedIn posts from Microsoft Advertising users  
\[linkedin embed] \[linkedin embed]  
\[linkedin embed]



\[Microsoft Advertising button]



##### Review previous project

\[Navigation Modernization button]



# Filtering design iterations



##### Bulk/supportive information filters

\[Table - Modal 1 - Bulk filters 1]  
Inspired by Microsoft Clarity, I explored a filter concept that allowed for bulk editing filters, as well as adding more supportive information to each filter selection to understand the impact of the selection. Unfortunately, this approach wasn’t feasible due to performance - loading all the data would take too long/be too resource intensive.



\[Table - Modal 2 - Bulk filters 2]  
Another hidden requirement for filters was being able to apply more than one statement per filter. Although I designed a viable path forward in the bulk approach, this was deemed too complex for a UI trying to simplify the experience for new users.

##### 

Smart / AI Filters 
\[Table - Modal 3 - Smart AI Filters 1]  
\[Table - Modal 4 - Smart AI Filters 2]  
Various methods of utilizing AI to provide better suggested filters/columns were explored, but these were put on the backburner due to needing to focus on getting the basics completed first.



##### Exploratory carrying filters between pages  

\[Table - Modal 5 - Filter Carry 1]  
\[Table - Modal 6 - Filter Carry 2]  
Most filter applications are temporary/exploratory, so the team had a hypothesis that saving/naming filters might feel too heavy for that workflow. We tested this interaction of carrying filters across pages where the filters can be shared, but this was met with confusion by users - they said this gave little value for them, and let them set filters by page.


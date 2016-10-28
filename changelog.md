# changelog

### Thursday, 27/10/2016 - v0.3.0
- Added guides to help with spacing, use by typeing `guides` as a prop
- Added a table element
- Split out the visual rendering from box into `internalBox`
- Added an additional div layer to box rendering to allow more fine grained control over positioning and sizing
- Styling of boxes are way more consistent now
- Pips are all fixed
- Ediotrs have been broken out and tab bar improved

### Wednesday, 26/10/2016 - v0.2.1
- Fixed bug where cloning didn't work Copied over the existing ids to the clone.
- Removed the 'tryNum' feature from fields. Moved that into the Logic Lib.

### Saturday, 22/10/2016 - v0.2.0
- Completely revamped how data works on client side
- Implemented a sheet store and actions
- Pages are much more light weight now
- Moved saving and pending logic into nav items
- Added several async actions
- Added a home page to see all published sheets


### Sunday, 25/09/2016
- Added a button to hide/show editor
- Split out the logic to render a sheet into a React element
- Updated the renderer and print view to use new logic
- Added ability to get PDF from local storage
- Fixed centering on header title
- Fixed title and label spacing on boxes
-


### Friday, 23/09/2016 - v0.1.1
- Sibling elements with the same base ID will now have their index part of the id.
- Added in the Repeat element
- Added in Label element


### Friday, 23/09/2016 - v0.1.0

- First stable release
- Still just the engine, but now to focus on the interface
- Print to PDF issues have been mostly fixed.
- Had a few testers use it for a campaign. Went way better than expected
- A few rendering bugs remain (not enough space for box in box labels and titles)
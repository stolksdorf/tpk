

### Data Models

Character
	- just data
	//- Link back to a sheet model
	- Just one core id

- Sheet
	- Has a full sheet, (info, template, logic, data)
	- Has to toggle searchability
	- has an edit and share id


### Pages

/
/home
	- Has a search bar and lists templates
	- When no search querys, just lists the core templates

/docs
	- Documentation on how to use each element

/template/:tid
/sheet/:sid
	- Highlighted save if changed data
	- Can't open edit?
	- Duplicate to new? Copies the current sheet info into localstorage and links to the new page
	- Will throw error if trying to leave withunsaved data
	- Print link -> /print/:sid?local=SHEET

/template/:tid?data=:cid
/sheet/:sid?data=:cid
	- Autosaves to that character data
	- Nav
		- Print -> /print/:sid?data=:cid
		- Create new sheet button, where the edit link is
			- dumps data into a local storage key and opens a /new


/edit/:eid
	- Able to edit info here
	- Full control
	- Auto save
	- Will throw error if trying to leave withunsaved data
	- Nav
		- Share link
		- Print
		- Publish button (if info.searchabile is false)


/new?local=:key
	- Loads sheet from local
	- Highlight save button
	- Auto dump to local storage 'NEW'
	- Print


/print?local=:key
/print/:sid?data=:cid&local=:key
	- Do a deep merge between the locally loaded data and sheet data




## Flow

- Finds sheet with id A on search
- Opens at /sheet/A
- Starts editing, and the save button lights up, warning on leave
- User hits save
	- Posts new character model with data set to server, returns id of B
	- redirects to /sheet/A?data=B
	- Now auto saves data changes to B
- User wants to tweak page
	- Clicks the tweak button in the upper left
	- On confirm, dumps current sheet state into local storage and opens /new?local=C
	- redirects




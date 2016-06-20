# tpk
Create your own custom character sheets for D&D using special HTML

### Todo
- Add a style generator to the utils.js
	- Analyzes props and makes a pre-gened style for width, height, and fontsize
	- Interpret `w` and `h` as width and height
- Only add min-height to shadow/border boxes
- figure out default data
- Add reset to the sheet data
- start to separate the data structures of the sheet and character
-

### Style
- width
- height
- fontsize
- center
- right
- bold



### Components

Sheet
* `landscape`
* `a4`

Box
* `shadow` - adds a darker background
* `border` - adds a fancy border
* `rows` - number of 'grid rows' this box has, used with `height`
* `columns` - number of 'grid columns' this box has, used with `width`

TextField
* `line` draws a line under the text field (default true)
* `label=` - Writes text beside the field
* `title=` - Writes text below the field
* `shadow` - Draws a background color on the textfield

TextBox
* `lines` - Draws lines inbetween rows
* `fontsize=` sets the font size
* Takes up as much height as possible by default

Pip
* `label`
* `alt` - converts the checkbox style into lil' diamonds

Pipbar
* `alt` - converts the checkbox style into lil' diamonds
* `count=` - Draws multiple checkboxes linked

Table
* `rows=` - How many rows to draw
* `headers=[]` - Array forcolumn titles
* Repeasts children n times

Statbox
* `mod` - Draws an additional field above statbox as a trapezoid
* `alt` - Draws an additonal field below statbox as a circle
* `border` is default
* `title` - top
* `label` - bottom

Statbar
* `label` - Filled in the box
* `flip` - Flips the

Marker
* The little box that hangs to the side of a box, used for currencies
* `label`
* `flip` - Flipos it to the other side of the box

Label
* Children is just text
* has standard styling

### Hybrid Components

Skill
* `title` - Draws text beside skill
* `label` - draws the smaller text
* `expert` - draws an additional checkbox
* `star` - converts the checkboxes into stars

Header
* Always draws a 'character name' text field to the left
* The contents will be placed the Box component to the right
* a 40/60 split between the textfield and box
* box defaults to `border`
* `label` draws text under the character name field
* `title` draws text above it




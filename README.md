# tpk
Create your own custom character sheets for D&D using special HTML


### Components

Sheet
* `landscape`
* `a4`

Box
* `shadow` - adds a darker background
* `border` - adds a fancy border
* `rows` - number of 'grid rows' this box has, used with `height`
* `columns` - number of 'grid columns' this box has, used with `width`

Text
* `line` draws a line under the text field
* `fontsize=` sets the font size
* `label=` - Writes text beside the field
* `title=` - Writes text below the field
* `shadow` - Draws a background color on the textfield

TextBox
* `lines` - Draws lines inbetween rows
* `fontsize=` sets the font size
* Takes up as much height as possible by default

Pip
* `label=` - Draws text beside the checkbox
* `star` - converts the checkbox style into lil' stars

Pipbar
* `label=` - Draws text beside the checkbox
* `star` - converts the checkbox style into lil' stars
* `count=` - Draws multiple checkboxes linked

Table
* `rows=` - How many rows to draw

Column
* `title` - Draws text at the top of the column
* `width=1` - Relative widths between columns
* Only goes within tables
* The children within the column gets repeated for each row

Statbox
* `mod` - Draws an additional field above statbox as a trapezoid
* `alt` - Draws an additonal field below statbox as a circle
* `border` is default
* `title` - top
* `label` - bottom

Statbar
* `label/title` - Filled in the box
* `flip` - Flips the

Marker
* The little box that hangs to the side of a box, used for currencies

* `label`
* `flip` - Flipos it to the other side of the box


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




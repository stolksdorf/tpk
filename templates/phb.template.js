module.exports = {
	viewId : 'phb_standard',
	templateId : 'phb_standard',
	info : {
		title : 'PHB Standard',
		desc : 'Player sheet right from the PHB',
		published : true
	},
	data : {},
	logic : '',
	template : `
<Sheet cols=3 rows=15>
	<Header w=3 h=2 rows=2 cols=3
		title='Awesome Sheet'
		label='Your Amazing Name'>
		<TextField label='class & level' />
		<TextField label='background' />
		<TextField label='player name' />
		<TextField label='race' />
		<TextField label='alignment' />
		<TextField label='exp' />
	</Header>

	<Box id='attr' shadow h=11 cols=8 rows=7 >
		<StatBox title='Strength' alt w=3/>
		<Box id='str' w=5>
			<Skill title='Saving Throw' alt />
			<Skill title='Athletics' expert />
		</Box>

		<StatBox label='Dexterity' mod w=3/>
		<Box id='dex' w=5>
			<Skill title='Saving Throw' alt />
			<Skill title='Acrobatics' />
			<Skill title='Sleight of hand' />
			<Skill title='Stealth' />
		</Box>

		<StatBox label='Constituion' mod w=3/>
		<Box id='con' w=5>
			<Skill title='Saving Throw' alt />
		</Box>

		<StatBox label='Intelligence' mod w=3/>
		<Box id='int' w=5>
			<Skill title='Saving Throw' alt />
			<Skill title='Arcana' />
			<Skill title='History' />
			<Skill title='Investigation' />
			<Skill title='Nature' />
			<Skill title='Religion' />
		</Box>

		<StatBox label='Wisdom' mod w=3/>
		<Box id='wis' w=5>
			<Skill title='Saving Throw' alt />
			<Skill title='Animal Handling' />
			<Skill title='Insight' />
			<Skill title='Medicine' />
			<Skill title='Perception' />
			<Skill title='Survival' />
		</Box>

		<StatBox label='Charisma' mod w=3/>
		<Box id='chr' w=5>
			<Skill title='Saving Throw' alt />
			<Skill title='Deception' />
			<Skill title='Intimidation' />
			<Skill title='Performance' />
			<Skill title='Persuasion' />
		</Box>

		<Box w=8 space>
			<Statbar label='Proficiency Bonus'/>
			<Statbar label='Passive Wisdom' />
		</Box>
	</Box>


	<Box id='stats' shadow h=4 cols=6 rows=3>
		<Statbox label='Armor class' w=2 />
		<Statbox label='Initiative' w=2 />
		<Statbox label='Speed' w=2 />
		<Box label='current hit points' w=6 border>
			<TextField tag='Hit Point Maximum' />
		</Box>
		<Box label='hit dice' w=3 border>
			<TextField tag='Total' />
		</Box>
		<Box label='Death Saves' w=3 border>

		</Box>
	</Box>

	<Box id='background' h=5 shadow rows=4>
		<TextBox title='personality traits' border h=1 />
		<TextBox label='ideals' border h=1 />
		<TextBox label='bonds' border h=1 />
		<TextBox label='flaws' border h=1 />
	</Box>

	<Box label='Attacks & spellcasting' border h=5 cols=5 rows=10>
		<TextField title='name' shadow w=2 />
		<TextField title='atk' shadow w=1 />
		<TextField title='dmg/type' shadow w=2 />

		<TextField id='name1' shadow w=2 />
		<TextField id='atk1' shadow w=1 />
		<TextField id='dmg1' shadow w=2 />

		<TextField id='name2' shadow w=2 />
		<TextField id='atk2' shadow w=1 />
		<TextField id='dmg3' shadow w=2 />

		<TextBox w=5 h=7 lines />
	</Box>

	<TextBox label='Proficiencies & Languages' border h=2 />
	<TextBox label='Features & Traits' border lines h=6 />

	<Box label='Resources, Ammo, & Charges' border h=2 w=1 cols=6>
		<TextField id='tf1' shadow w=2 /> <Pipbar id='p1' w=4 count=7 />
		<TextField id='tf2' shadow w=2 /> <Pipbar id='p2' w=4 count=7 />
		<TextField id='tf3' shadow w=2 /> <Pipbar id='p3' w=4 count=7 />
		<TextField id='tf4' shadow w=2 /> <Pipbar id='p4' w=4 count=7 />
		<TextField id='tf5' shadow w=2 /> <Pipbar id='p5' w=4 count=7 />
	</Box>

	<Box label='Equipment' border h=2 w=2 cols=2>
		<TextBox id='field1' lines />
		<TextBox id='field2' lines />
	</Box>
</Sheet>







<Sheet cols=3 rows=15>
	<Header w=3 h=2 rows=2 cols=3
		title='Backstory'
		label='Your Name'>
		<TextField label='Age' />
		<TextField label='height' />
		<TextField label='weight' />
		<TextField label='eyes' />
		<TextField label='skin' />
		<TextField label='hair' />
	</Header>

	<Box label='Character Appearance' border h=5 />

	<Box label='Allies & Organizations' w=2 border h=5 cols=2>
		<TextBox lines />
		<Box shadow>
				<Box border label='symbol'>
					<TextField title='name' shadow />
			</Box>
		</Box>
	</Box>
	<Box label='Character Backstory' border h=8 />

	<Box label='Character Backstory' border h=5 w=2 cols=2>
		<TextBox id='field1' />
		<TextBox id='field2' />
	</Box>

	<Box label='treasure' border h=3 w=2 cols=2>
		<TextBox id='field1' lines />
		<TextBox id='field2' lines />
	</Box>
</Sheet>
`
}
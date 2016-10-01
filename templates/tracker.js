/* BUGS
	- the un-id'd box has a "na_n" id
	- HP and pips won't stay side-by-side, width rendering issue
*/


module.exports = {
	id : 'blank',
	shareId : '',
	name : `Blank Slate`,
	desc : '',
	sheet : {
		data : {},
		logic : `
if(data.tracker.na_n.m_5){
	data.tracker.na_n.m_5 = false;
	data.tracker.hp.value -= 5;
}

if(data.tracker.na_n.p_5){
	data.tracker.na_n.p_5 = false;
	data.tracker.hp.value += 5;
}

if(data.tracker.na_n.set_max){
	data.tracker.na_n.set_max = false;
	data.tracker.hp.value = data.tracker.max_hp;
}

`,
		template : `
<Sheet cols=4 rows=20>
		<Box id='tracker' border h=3 rows=4 cols=3>
			<TextField label='max hp' shadow w=3 />
			<StatBox label='hp' border h=2 w=1 />
			<Box w=2>
				<Pip label='set max' />
				<Pip id='p5' label='+5' />
				<Pip id='m5' label='-5' />
			</Box>

		</Box>
</Sheet>

`
	}
}
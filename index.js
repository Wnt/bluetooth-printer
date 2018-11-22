let encoder = new EscPosEncoder();

document.getElementById('connect')
.addEventListener('click', () => {
	BluetoothPrinter.connect()
	.then(() => {
		window.alert('Ready to print!');
		console.log('connected');

		BluetoothPrinter.addEventListener('disconnected', () => {
			console.log('disconnected');
		});
	}).catch(function(e) {
		window.alert('Connection failed, please try again!');
	});
});

document.getElementById('print')
.addEventListener('click', () => {
	if (!BluetoothPrinter.isConnected()) {
		window.alert('Printer is not connected!');
		return;
	}
	// normal text: 32 characters per line
	// small text: 42 characters per line
	let command = encoder
	.text('This is ')
	.underline()
	.text('underlined')
	.underline()
	.text(' an this is not')
	.newline()
	.text('8<------------------------------')
	.newline()
	.newline()
	.newline()
	.encode()
	BluetoothPrinter.print(command);
});
document.getElementById('print-logo')
.addEventListener('click', () => {
	if (!BluetoothPrinter.isConnected()) {
		window.alert('Printer is not connected!');
		return;
	}
	var img = new Image();
	img.src = 'vaadin-logo.svg';

	img.onload = function() {
		BluetoothPrinter.print(encoder
			.image(img, 384, 88, 'atkinson')
			.text('384 x 88')
			.newline()
			.newline()
			.newline()
			.encode());
		}

	});

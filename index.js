let encoder = new EscPosEncoder();

document.getElementById('connect')
	.addEventListener('click', () => {
		BluetoothPrinter.connect()
			.then(() => {
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
        let command = encoder
            .align('right')
            .line('This line is aligned to the right')
            .align('center')
            .line('This line is centered')
            .align('left')
            .line('This line is aligned to the left')
            .encode()
		BluetoothPrinter.print(command);
	});
class Key {
	constructor(key, key2, isAux, width, isBlank) {
		this.key = key;
		this.key2 = key2;
		this.isAux = isAux;
		this.width = width || "29px";
		this.isBlank = isBlank;
		console.log(this)
	}
	getStyle() {
		return "width: " + this.width
	}
	getClass(shift, caps) {
		if (this.key === "Shift" && shift) return "pressed"
		if (this.key === "Caps" && caps) return "pressed"
		if (this.isBlank) return "blank"
		return ''
	}
	getKey(shift, caps) {
		if (this.isAux) return this.key
		if (shift && caps) {
			return this.key2 || this.key
		} else if (shift) {
			return this.key2 || this.key.toUpperCase()
		} else if (caps) {
			return this.key.toUpperCase()
		} else {
			return this.key
		}
	}
}
let keys = []
keys.push(new Key("ё"))
keys.push(new Key("1", "!"))
keys.push(new Key("2", "\""))
keys.push(new Key("3", "№"))
keys.push(new Key("4", ";"))
keys.push(new Key("5", "%"))
keys.push(new Key("6", ":"))
keys.push(new Key("7", "?"))
keys.push(new Key("8", "*"))
keys.push(new Key("9", "("))
keys.push(new Key("0", ")"))
keys.push(new Key("-", "_"))
keys.push(new Key("=", "+"))
keys.push(new Key("⌫ ", "", true, "62px"))
keys.push(new Key("1", "1", false, "45.5px", true))
keys.push(new Key("й"))
keys.push(new Key("ц"))
keys.push(new Key("у"))
keys.push(new Key("к"))
keys.push(new Key("е"))
keys.push(new Key("н"))
keys.push(new Key("г"))
keys.push(new Key("ш"))
keys.push(new Key("щ"))
keys.push(new Key("з"))
keys.push(new Key("х"))
keys.push(new Key("ъ"))
keys.push(new Key("\\", "/", false, "45.5px"))
keys.push(new Key("Caps","", true, "53.75px"))
keys.push(new Key("ф"))
keys.push(new Key("ы"))
keys.push(new Key("в"))
keys.push(new Key("а"))
keys.push(new Key("п"))
keys.push(new Key("р"))
keys.push(new Key("о"))
keys.push(new Key("л"))
keys.push(new Key("д"))
keys.push(new Key("ж"))
keys.push(new Key("э"))
keys.push(new Key("1", "1", false, "70.25px", true))
keys.push(new Key("Shift","", true, "70.25px"))
keys.push(new Key("я"))
keys.push(new Key("ч"))
keys.push(new Key("с"))
keys.push(new Key("м"))
keys.push(new Key("и"))
keys.push(new Key("т"))
keys.push(new Key("ь"))
keys.push(new Key("б"))
keys.push(new Key("ю"))
keys.push(new Key(".", ","))
keys.push(new Key("Shift","", true, "86.75px"))
keys.push(new Key(" ", "", false, "491px"))

const app = new Vue({
	el: "#app",
	data: {
		input: '',
		keyboard: {
			posX: 100,
			posY: 100,
			targetX: 100, targetY: 100,
			moving: false,
			show: true,
			caps: false,
			shift: false,
			keys: keys,
		}
	},
	computed: {
		positionStyle() {
			let style = "left: " + this.keyboard.posX + "px; top: " + this.keyboard.posY + "px;"
			return style
		}
	},
	methods: {
		keyClick(key) {
			console.log(key)
			if (key.length === 1) {
				this.input += key
				if (this.keyboard.shift) this.keyboard.shift = false
			} else if (key === '⌫ ') {
				this.input = this.input.slice(0, this.input.length - 1)
			} else if (key === "Shift") {
				this.keyboard.shift = !this.keyboard.shift
			} else if (key === "Caps") {
				this.keyboard.caps = !this.keyboard.caps
			}
			this.returnFocus()
		},
		mouseDown(e) {
			this.keyboard.moving = true;
			this.returnFocus()
		},
		mouseUp(e) {
			this.keyboard.moving = false;
			this.keyboard.targetX = this.keyboard.posX;
			this.keyboard.targetY = this.keyboard.posY;
		},
		mouseMove(e) {
			if (this.keyboard.moving) {
				this.keyboard.targetX += e.movementX;
				this.keyboard.targetY += e.movementY;
				this.returnFocus()
			}
			console.log(e)
			this.keyboard.posX = this.keyboard.targetX
			if (this.keyboard.posX < 3) this.keyboard.posX = 3
			if (this.keyboard.posX > window.innerWidth - 517 - 3) this.keyboard.posX = window.innerWidth - 517 - 3
			this.keyboard.posY = this.keyboard.targetY
			if (this.keyboard.posY < 3) this.keyboard.posY = 3
			if (this.keyboard.posY > window.innerHeight - 220 - 3) this.keyboard.posY = window.innerHeight - 220 - 3
		},
		switchKeyboard() {
			this.keyboard.show = !this.keyboard.show;
			if (this.keyboard.show) {
				document.querySelector(".input-container input").focus()
			}
			this.returnFocus()
		},
		returnFocus() {
			document.querySelector('input').focus()
		},
		clear() {
			this.input = ""
		}
	},
	mounted() {
		document.onmouseup = function(){app.mouseUp()}
		document.onmousemove = function(e){app.mouseMove(e)}
	}
})
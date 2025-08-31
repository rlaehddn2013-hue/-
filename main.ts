function MOTER_LED () {
    if (토습 >= 70) {
        basic.showIcon(IconNames.Happy)
        모터of = "OFF"
        I2C_LCD1602.ShowString(모터of, 6, 1)
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else if (토습 >= 30 && 토습 < 70) {
        basic.showIcon(IconNames.Asleep)
        모터of = "ON"
        I2C_LCD1602.ShowString(모터of, 6, 1)
        pins.digitalWritePin(DigitalPin.P13, pins.digitalReadPin(DigitalPin.P1))
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    } else if (토습 < 30) {
        basic.showIcon(IconNames.Sad)
        모터of = "on"
        I2C_LCD1602.ShowString(모터of, 6, 1)
        pins.digitalWritePin(DigitalPin.P13, pins.digitalReadPin(DigitalPin.P1))
        pins.digitalWritePin(DigitalPin.P12, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
}
function LSD () {
    모터of = "I/0"
    I2C_LCD1602.clear()
    I2C_LCD1602.ShowString("soil Hum1", 0, 0)
    I2C_LCD1602.ShowString("000%", 11, 0)
    I2C_LCD1602.ShowString("Moter" + 모터of + "[", 0, 0)
    I2C_LCD1602.ShowString("000%]", 11, 1)
}
function MotorPower () {
    let 모파 = 0
    if (모파 >= 100) {
        I2C_LCD1602.ShowString(convertToText(모파), 11, 1)
    } else if (모파 >= 10) {
        I2C_LCD1602.ShowString("0" + convertToText(모터of), 11, 1)
    } else {
        I2C_LCD1602.ShowString(convertToText("00" + convertToText(모파)), 11, 1)
    }
}
function SoilHumi () {
    if (토습 >= 100) {
        I2C_LCD1602.ShowString(convertToText(토습), 11, 0)
    } else if (토습 >= 10) {
        I2C_LCD1602.ShowString("0" + convertToText(토습), 11, 0)
    } else {
        I2C_LCD1602.ShowString(convertToText("00" + convertToText(토습)), 11, 0)
    }
}
let 모터of = ""
let 토습 = 0
I2C_LCD1602.LcdInit(0)
I2C_LCD1602.BacklightOff()
basic.pause(500)
I2C_LCD1602.BacklightOn()
basic.showIcon(IconNames.House)
I2C_LCD1602.ShowString("Grow F1owerpot", 1, 0)
I2C_LCD1602.ShowString("kit", 5, 1)
basic.pause(2000)
basic.clearScreen()
pins.digitalWritePin(DigitalPin.P1, 0)
LSD()
basic.forever(function () {
    토습 = Math.round(Math.map(pins.analogReadPin(AnalogPin.P0), 1023, 195, 0, 100))
    토습 = Math.round(Math.map(pins.analogReadPin(AnalogReadWritePin.P1), 0, 1023, 0, 100))
    SoilHumi()
    MotorPower()
    MOTER_LED()
})


/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

const INIT_GROUP = 99

namespace RobotImp {
    export function MotorLeft(SpeedVal: number) {
        AlphaBot2.MotorRun(Motors.M1, SpeedVal)
    }

    export function MotorRight(SpeedVal: number) {
        AlphaBot2.MotorRun(Motors.M2, SpeedVal)

    }

    export function GetDistance(): number {
        return AlphaBot2.Ultrasonic()
    }

    export function LineSensorStatus(): number {
        let sensor_values = AlphaBot2.readCalibrated();
        let i = 0
        let Multiplier = 1
        let LineSensor = 0
        for (i = 0; i < 5; i++) {
            let value = sensor_values[i];
            if (value > 300) LineSensor = LineSensor + Multiplier
            Multiplier = Multiplier * 10
        }
        return LineSensor
    }

    export function Init() {
        AlphaBot2.SensorCalibrated()
        while (!input.buttonIsPressed(Button.A)) {
            basic.clearScreen()
            let sv = AlphaBot2.readCalibrated()
            let i = 0
            let val = 0
            for (i = 0; i < 5; i++) {
                val = Math.idiv(sv[i], 200)
                if (val > 4) val = 4
                led.plot(i, val)

            }
            basic.pause(1000)
        }
    }

    export function FollowTheLine () {
        let Sens = RobotImp.LineSensorStatus()
        do {
            Sens = RobotImp.LineSensorStatus()
            let s1 = Math.idiv((Sens % 100), 10)
            let s2 = Math.idiv(Sens, 1000) % 10
            Sens = s2 * 10 + s1
            if (Sens == 11) {
                RobotImp.MotorLeft(40)
                RobotImp.MotorRight(40)
            } else if (Sens == 10) {
                RobotImp.MotorLeft(0)
                RobotImp.MotorRight(30)
            } else if (Sens == 1) {
                RobotImp.MotorLeft(30)
                RobotImp.MotorRight(0)
            } else {
                RobotImp.MotorLeft(30)
                RobotImp.MotorRight(30)
            }
            basic.pause(10)
        } while (!input.buttonIsPressed(Button.A))
        RobotImp.MotorLeft(0)
        RobotImp.MotorRight(0)  
    } 
}

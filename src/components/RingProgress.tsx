import { Text, View, StyleSheet } from "react-native";
import SVG, { Circle } from 'react-native-svg'

type TRingProps = {
    radius?: number;
    strokeWidth?: number;
    progress: number
};

const color = "#ee0f55"

const RingProgress = ({ radius = 100, strokeWidth=40, progress }: TRingProps) => {
    const innerRadius = radius - strokeWidth / 2;

    const circumference = 2 * Math.PI * innerRadius
    
    return (
        <View style={{ 
            width: radius * 2,
            height: radius * 2,
            alignSelf: 'center'
        }}>
           <SVG>
                {/* Bacground */}
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    opacity={0.2}
                />
                {/* Foreground */}
                <Circle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    originX={radius}
                    originY={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={[circumference * progress, circumference]}
                    strokeLinecap="round"
                    rotation='-90'
                />
           </SVG>
        </View>
    )
}

const styles = StyleSheet.create({
    ringContainer: {
       
    }
})

export default RingProgress;
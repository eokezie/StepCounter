import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SVG, { Circle } from 'react-native-svg';
import Animated, {
    useAnimatedProps, 
    useSharedValue,
    withTiming
} from "react-native-reanimated";

type TRingProps = {
    radius?: number;
    strokeWidth?: number;
    progress: number
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const color = "#ee0f55"

const RingProgress = ({ radius = 100, strokeWidth=40, progress }: TRingProps) => {
    const innerRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;

    const fillAmount = useSharedValue(0);
    const animatedProps = useAnimatedProps(() => ({
        strokeDasharray: [circumference * fillAmount.value, circumference]
    }))
    
    React.useEffect(() => {
        fillAmount.value = withTiming(progress, { duration: 1500 });
    }, [progress]);

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
                <AnimatedCircle
                    cx={radius}
                    cy={radius}
                    r={innerRadius}
                    originX={radius}
                    originY={radius}
                    animatedProps={animatedProps}
                    stroke={color}
                    strokeWidth={strokeWidth}
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
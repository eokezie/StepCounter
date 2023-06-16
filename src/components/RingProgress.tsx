import React from "react";
import { Text, View, StyleSheet } from "react-native";
import SVG, { Circle, CircleProps } from 'react-native-svg';
import Animated, {
    useAnimatedProps, 
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import { AntDesign } from '@expo/vector-icons';


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

    const defaultProps: CircleProps = {
        cx:radius,
        cy:radius,
        r:innerRadius,
        originX:radius,
        originY:radius,
        stroke:color,
        strokeWidth:strokeWidth,
        strokeLinecap:"round"
    }
    
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
                    {...defaultProps}
                    opacity={0.4}
                />
                {/* Foreground */}
                <AnimatedCircle
                    animatedProps={animatedProps}
                    rotation='-90'
                    {...defaultProps}
                />
            </SVG>
            <AntDesign 
                name="arrowright"
                size={strokeWidth * 0.8}
                color={'black'}
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: strokeWidth * 0.1
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ringContainer: {
       
    }
})

export default RingProgress;
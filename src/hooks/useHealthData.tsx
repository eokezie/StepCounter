import React from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, { 
    HealthInputOptions, 
    HealthKitPermissions, 
    HealthUnit
  } from 'react-native-health';
  
  const permissions: HealthKitPermissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.FlightsClimbed,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning
      ],
      write: []
    }
  };

const useHealthData = (date: Date) => {
  const [ hasPermissions, setHasPermissions ] = React.useState<boolean>(false);
  const [ steps, setSteps ] = React.useState<number>(0);
  const [ distance, setDistance ] = React.useState<number>(0);
  const [ flightsClimbed, setFlightsClimbed ] = React.useState<number>(0);

  React.useEffect(() => {
    /**
   * Checkout 1hr:30mins fror setting up AppleHealthKit native code
   * for Expo Go
   * 
   * Generating native codes for ios
   * npx expo prebuild --platform ios
   */
    if (Platform.OS !== 'ios') {
        return
    };
    
    AppleHealthKit.isAvailable((err, isAvailable) => {
        if (err) {
            console.log('Error checking availability')
            return
        };
        if (!isAvailable) {
            console.log('Apple Health is not available')
            return
        }

        AppleHealthKit.initHealthKit(permissions, (error) => {
            if (error) {
              console.log('Error getting permissions');
              return;
            }
            setHasPermissions(true);
        });
    })
  }, []);

  React.useEffect(() => {
    if (!hasPermissions) {
      return;
    };

    const options: HealthInputOptions = {
      date: date.toISOString(),
      includeManuallyAdded: false,
      unit: HealthUnit.meter
    }

    AppleHealthKit.getStepCount(options, (err, result) => {
      if (err) {
        console.log('Error getting steps');
        return;
      }
      setSteps(result.value)
    });

    AppleHealthKit.getFlightsClimbed(options, (err, result) => {
      if (err) {
        console.log('Error getting flights climbed');
        return;
      }
      setFlightsClimbed(result.value)
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, result) => {
      if (err) {
        console.log('Error getting distance covered');
        return;
      }
      setDistance(result.value)
    });
  }, [hasPermissions])

  return {
    steps,
    flightsClimbed,
    distance
  }
}

export {
    useHealthData
}
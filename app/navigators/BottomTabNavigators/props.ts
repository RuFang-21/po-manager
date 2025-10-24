import { BottomTabScreenProps as NativeStackScreenProps } from '@react-navigation/bottom-tabs';

import { DiscoverRoute } from '@app/screens/Discover/props';

export type BottomTabParamList = {
  Homepage?: undefined;
  Discover?: {
    destinationTab: DiscoverRoute['key'];
  };
  Community?: undefined;
  Profile?: {
    userId: string;
    userName?: string;
    userAvatar?: string;
  };
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  NativeStackScreenProps<BottomTabParamList, T>;

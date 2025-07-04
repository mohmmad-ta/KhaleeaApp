declare module 'react-native-vector-icons' {
    import { ComponentType } from 'react';
    import { TextProps } from 'react-native';

    export interface IconProps extends TextProps {
        name: string;
        size?: number;
        color?: string;
        // add other props you need here
    }

    export const createIconSet: (glyphMap: object, fontName: string, fontFile?: string) => ComponentType<IconProps>;

    // The default export is the main Icon component
    const Icon: ComponentType<IconProps>;
    export default Icon;
}
declare module 'react-native-vector-icons/FontAwesome' {
    import { ComponentType } from 'react';
    import { TextProps } from 'react-native';

    interface IconProps extends TextProps {
        name: string;
        size?: number;
        color?: string;
    }

    const Icon: ComponentType<IconProps>;
    export default Icon;
}
declare module 'react-native-vector-icons/AntDesign' {
    import { ComponentType } from 'react';
    import { TextProps } from 'react-native';

    interface IconProps extends TextProps {
        name: string;
        size?: number;
        color?: string;
    }

    const Icon: ComponentType<IconProps>;
    export default Icon;
}

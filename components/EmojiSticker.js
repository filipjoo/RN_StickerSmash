import { View, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

export default function EmojiSticker({ imageSize, stickerSource }) {

    // 画像をタップしたときに拡大縮小する処理
    // scaleImageは画像のサイズを管理する変数
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const scaleImage = useSharedValue(imageSize);

    const onDoubleTap = useAnimatedGestureHandler({
        onActive: () => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = imageSize;
            }
        },
        // onDoubleTapが呼び出されたら確認のためにalertを出す
        onEnd: () => {
            console.log('onDoubleTap');
        },
    });

    // 変更されたscaleImageをstyleに反映させる
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });

    // 画像をドラッグしたときに移動する処理
    // translateX, translateYは画像の位置を管理する変数
    const AnimatedView = Animated.createAnimatedComponent(View);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const onDrag = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = context.translateX + event.translationX;
            translateY.value = context.translateY + event.translationY;
        },
    });

    // 変更されたtranslateX, translateYをstyleに反映させる
    const conttainerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });



    return (
        <PanGestureHandler onGestureEvent={onDrag}>
            <AnimatedView style={[conttainerStyle, { top: -350 }]}>
                <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
                    <AnimatedImage
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle, { width: imageSize, height: imageSize }]}
                    />
                </TapGestureHandler>
            </AnimatedView>
        </PanGestureHandler>
    );
}

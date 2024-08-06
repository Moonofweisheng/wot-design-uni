<template>
	<view class="wd-bezier" :class="{ 'wd-animate__bezier': animate }"
		:style="{ left: left, top: top, transform: transform_x }" @tap="handleClick">
		<view class="wd-badge__bezier" :class="{ 'wd-animate__bezier_y': animate }"
			:style="{ width: width, height: height, borderRadius: height, backgroundColor: backgroundColor, transform: transform_y }">
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		name: 'wd-bezier',
		options: {
			addGlobalClass: true,
			virtualHost: true,
			styleIsolation: 'shared'
		}
	}
</script>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { cubicBezierProps } from './types'
	const props = defineProps(cubicBezierProps)
	console.log(props.width);
	const emit = defineEmits([
		'change'
	])
	// 当前时间
	const time = ref<number>(0);
	// 防抖时间
	const oneTime = ref<number>(800);
	// 动画
	const animate = ref<boolean>(false);
	// x轴
	const transform_x = ref<string>('');
	// y轴
	const transform_y = ref<string>('');
	// 防抖 限制重复点击
	function handleClick(e : any) {
		if (new Date().getTime() - time.value <= oneTime.value) return;
		time.value = new Date().getTime();
		setTimeout(() => {
			time.value = 0;
		}, oneTime.value);
		bezierEffect(e);
		emit('change', props.index)
	}
	//开始动画效果
	function bezierEffect(e : any) {
		let touch = e.touches[0];
		let diff = {
			x: 0,
			y: 0
		};
		//up-右上，down-右下, bottom-左下，top-左上
		switch (props.direction) {
			case 'up':
				diff.x = props.windowWidth - touch.clientX - props.position.right;
				diff.y = props.position.top - touch.clientY;
				break;
			case 'down':
				diff.x = props.windowWidth - touch.clientX - props.position.right;
				diff.y = props.windowHeight - touch.clientY - props.position.bottom;
				break;
			case 'bottom':
				diff.x = props.position.left - touch.clientX;
				diff.y = props.windowHeight - touch.clientY - props.position.bottom;
				break;
			case 'top':
				diff.x = props.position.left - touch.clientX;
				diff.y = props.position.top - touch.clientY;
				break;
			default:
				break;
		}
		animate.value = true;
		transform_x.value = `translate3d(${diff.x}px,0,0)`;
		transform_y.value = `translate3d(0,${diff.y}px,0) rotate(350deg) scale(0.8)`;
		setTimeout(() => {
			animate.value = false;
			//重置状态
			transform_x.value = '';
			transform_y.value = '';
		}, oneTime.value - 200);
	}
</script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
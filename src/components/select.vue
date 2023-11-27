<template>
  <select id="select" ref="select" @change="change">
    <option :value="item.value" v-for="(item, i) in props.option" :key="i">
      {{ item.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";

const props = defineProps({
  option: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
});

const emit = defineEmits(["update:modelValue"]);

const select = ref<any>();
const selectVal = ref<any>(props.option[0].value);

onMounted(() => {
  console.log(select.value?.selectedIndex);
  emit("update:modelValue", selectVal.value);
});

const change = (e: any) => {
  selectVal.value = e.target.value
  emit("update:modelValue", selectVal.value);
};
</script>

<style scoped></style>

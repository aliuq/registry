<script setup lang="ts">
import { CircleX, RotateCcw } from 'lucide-vue-next'
import { computed, toValue, useAttrs, useTemplateRef } from 'vue'

interface InputProps {
  /** 输入框的默认值，默认为空字符串 */
  defaultValue?: string
  /** 是否显示清除按钮，默认为 true */
  clearable?: boolean
  /** 是否显示重置按钮，默认为 true */
  resettable?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  clearable: true,
  resettable: true,
})

const modelValue = defineModel<string>()
const attrs = useAttrs()
const defaultValue = props.defaultValue ?? toValue(modelValue.value) ?? ''
const input = useTemplateRef('input')

const showClear = computed(() => props.clearable && modelValue.value)
const showReset = computed(() => props.resettable && (modelValue.value !== defaultValue || (modelValue.value === '' && defaultValue !== '')))

function handleClear() {
  modelValue.value = ''
  input.value?.$el?.focus()
}

function handleReset() {
  modelValue.value = defaultValue
  input.value?.$el?.focus()
}
</script>

<template>
  <InputGroup>
    <InputGroupInput v-bind="attrs" ref="input" v-model="modelValue" type="text" autocomplete="on" />
    <InputGroupAddon v-if="showClear || showReset" align="inline-end" class="gap-1">
      <InputGroupButton v-if="showClear" size="icon-xs" tabindex="-1" @click="handleClear">
        <CircleX class="size-4" />
      </InputGroupButton>
      <InputGroupButton v-if="showReset" size="icon-xs" tabindex="-1" @click="handleReset">
        <RotateCcw class="size-4" />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>

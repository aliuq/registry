<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

interface Link {
  text: string
  href: string
}

defineProps<{
  links: Link[]
}>()
</script>

<template>
  <ButtonGroup>
    <Button v-for="link in links" :key="link.href" as-child variant="outline" size="sm">
      <a :href="link.href" target="_blank" rel="noopener noreferrer">
        {{ link.text }}
        <ExternalLink class="size-4" />
      </a>
    </Button>
  </ButtonGroup>
</template>

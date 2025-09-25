<template>
  <div class="contract-preview">
    <h1 class="mb-4 text-xl font-bold">契約書プレビュー</h1>

    <!-- 操作ボタン -->
    <div class="mb-4 space-x-2">
      <button @click="zoomOut" class="bg-gray-500 text-white px-3 py-1 rounded">-</button>
      <button @click="zoomIn" class="bg-gray-500 text-white px-3 py-1 rounded">+</button>
    </div>

    <!-- PDF全体ラッパー -->
    <div class="overflow-x-auto">
      <div ref="zoomWrapper" class="pdf-zoom-wrapper">
        <div ref="previewContainer" class="pdf-preview space-y-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as pdfjsLib from "pdfjs-dist"
// @ts-ignore
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const previewContainer = ref<HTMLDivElement | null>(null)
const zoomWrapper = ref<HTMLDivElement | null>(null)
const zoomScale = ref(1.0)

const fetchPdfBlob = async (url: string): Promise<Blob> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`)
  return await res.blob()
}

const renderPdf = async (blob: Blob) => {
  const url = URL.createObjectURL(blob)
  const pdf = await pdfjsLib.getDocument(url).promise
  previewContainer.value!.innerHTML = ""

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale: 1.0 }) // 初期表示は1.0

    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")!

    canvas.height = viewport.height
    canvas.width = viewport.width

    await page.render({ canvasContext: context, viewport, canvas }).promise

    // ページをラップして追加
    const pageWrapper = document.createElement("div")
    pageWrapper.className = "pdf-page"
    pageWrapper.appendChild(canvas)
    previewContainer.value?.appendChild(pageWrapper)
  }

  URL.revokeObjectURL(url)
}

const applyGlobalZoom = () => {
  if (zoomWrapper.value) {
    zoomWrapper.value.style.transform = `scale(${zoomScale.value})`
    zoomWrapper.value.style.transformOrigin = "top center"
    zoomWrapper.value.style.transition = "transform 0.2s ease"
  }
}

const zoomIn = () => {
  zoomScale.value = Math.min(zoomScale.value + 0.2, 3.0)
  applyGlobalZoom()
}

const zoomOut = () => {
  zoomScale.value = Math.max(zoomScale.value - 0.2, 0.5)
  applyGlobalZoom()
}

onMounted(async () => {
  // サンプルPDFを読み込む（ローカル or 外部URL）
  const pdfBlob = await fetchPdfBlob("/pdf_sample.pdf")
  await renderPdf(pdfBlob)
})
</script>

<style>
.pdf-zoom-wrapper {
  display: inline-block;
}

.pdf-page canvas {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>

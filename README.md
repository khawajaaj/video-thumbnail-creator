# 🎬 Video Thumbnail Creator

[![npm version](https://img.shields.io/npm/v/video-thumbnail-creator)](https://www.npmjs.com/package/video-thumbnail-creator) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Generate thumbnails from video files directly in the browser using JavaScript. Lightweight, zero dependencies, and works with `<input type="file">` uploads.

---

## 🚀 Installation

```bash
npm install video-thumbnail-creator
# or
yarn add video-thumbnail-creator
```

---

## 📖 Usage

```ts
import { generateThumbnail } from "video-thumbnail-creator";

const fileInput = document.querySelector<HTMLInputElement>("#file");

fileInput?.addEventListener("change", async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const thumbnail = await generateThumbnail(file, 3); // seek at 3 seconds
    if (thumbnail) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(thumbnail);
      document.body.appendChild(img);
    }
  }
});
```

---

## ⚙️ API

### `generateThumbnail(file: File, seekTime?: number): Promise<Blob | null>`

* **file**: `File` → The video file (from file input or drag-and-drop).
* **seekTime**: `number` → Optional. Time in seconds to capture the frame (default: `2`).
* **returns**: `Promise<Blob | null>` → Resolves with a `Blob` containing the thumbnail image, or `null` if capture fails.

---

## 🌟 Features

* 🖼 Extracts a still frame as JPEG
* ⏱ Configurable seek time
* 🎯 Works directly in the browser (no server needed)
* ⚡ Zero dependencies

---

## 📦 Example with React

```tsx
import React, { useState } from "react";
import { generateThumbnail } from "video-thumbnail-creator";

export default function App() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blob = await generateThumbnail(file, 5);
      if (blob) {
        setPreview(URL.createObjectURL(blob));
      }
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFile} />
      {preview && <img src={preview} alt="Video thumbnail" />}
    </div>
  );
}
```

---

## 🔧 Development

```bash
git clone https://github.com/yourusername/video-thumbnail-creator.git
cd video-thumbnail-creator
npm install
npm run build
```

---

## 📜 License

MIT © Khawaja Awais

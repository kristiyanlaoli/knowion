"use client";
import React, { useRef, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "editorjs-header-with-alignment";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Table from "@editorjs/table";
import InlineCode from "@editorjs/inline-code";
import DragDrop from "editorjs-drag-drop";
import Undo from "editorjs-undo";
import CodeTool from "@editorjs/code";
import MathTex from "editorjs-math";
import SimpleImage from "simple-image-editorjs";
import nextAppLoader from "next/dist/build/webpack/loaders/next-app-loader";

function EditorPage() {
  const editorRef = useRef<EditorJS | null>(null);

  const handleSave = async () => {
    if (editorRef.current) {
      const outputData = await editorRef.current.save();
      console.log("Saved data: ", outputData);
      // Anda bisa mengirim outputData ke backend Anda di sini
    }
  };

  const savedData = {
    time: 1711613582443,
    blocks: [
      {
        id: "D34RoJiCIM",
        type: "header",
        data: {
          text: "Ini Header Saja",
          level: 2,
          alignment: "left",
        },
      },
      {
        id: "SqQNPvWTN9",
        type: "math",
        data: {
          text: "\\frac{1}{2} \\alpha",
        },
      },
      {
        id: "P6BhrmCMYM",
        type: "paragraph",
        data: {
          text: "Ini sebuah text",
        },
      },
    ],
    version: "2.29.0",
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        onReady: () => {
          try {
            new DragDrop(editorRef.current);
            new Undo({ editorRef });
          } catch (error) {
            console.error("Error when initializing plugins: ", error);
          }
        },
        data: savedData,
        holder: "editorjs",
        placeholder: "Let's write an awesome knowledge!",
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4, 5], // Tingkat heading yang diaktifkan
              defaultLevel: 2, // Tingkat heading default
            },
          },
          image: SimpleImage,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },

          code: CodeTool,
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          math: {
            class: MathTex,
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          checklist: Checklist,
          marker: Marker,
          quote: Quote,
        },
      });
    }
  }, []);

  return (
    <main
      id="myeditor"
      className="px-[10px] sm:px-[20px] md:mx-[70px] lg:mx-[170px] xl:mx-[250px] 2xl:mx-[350px] border-x-2 "
    >
      <div>
        <div id="editorjs"></div>
        <button onClick={handleSave}>Save</button> {/* Tombol Save */}
      </div>
    </main>
  );
}

export default EditorPage;

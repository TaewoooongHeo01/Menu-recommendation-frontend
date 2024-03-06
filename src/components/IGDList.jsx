import React from "react";
import "../App.css";
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
 
function IGDScroll() {
  return (
    <>
    <h4 className="mb-4 pl-4 pt-4 text-sm font-medium leading-none">재료 선택</h4>
    <ScrollArea className="w-64 rounded-md pl-4 pr-4 pb-4" style={{height: "90%"}}>
      <div className="p-1">
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
    </>
  )
}

// IGDList 컴포넌트
function IGDList() {
    return (
      <div className="w-1/2 bg-gray-50 p-4 overflow-auto h-full shadow-lg rounded-lg overflow-hidden border border-gray-250">
        <IGDScroll/>
      </div>
    );
}

export default IGDList;


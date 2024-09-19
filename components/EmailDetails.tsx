import React from 'react'
import { Label } from './ui/label'
import { FancyMultiSelect } from './ui/fancy-multi-select'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

export default function EmailDetails() {
  return (
    <div className="flex flex-col gap-2.5 2xl:gap-3">
    <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
      To
    </Label>
    <span className="flex gap-1.5 justify-center items-center text-center font-medium">
      
      <FancyMultiSelect />
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">CC</ToggleGroupItem>
        <ToggleGroupItem value="b">BCC</ToggleGroupItem>
      </ToggleGroup>
      
    </span>
    <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
      Subject
    </Label>
    <Input />
    <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
      Message
    </Label>
    <Textarea className="h-[180px] max-h-[200px] 2xl:h-[200px] 2xl:max-h-[240px]" />
    <Label className="text-[14.5px] 2xl:text-lg text-textColor-700 font-semibold">
      Attachments
    </Label>
    <Input className="w-[50%] 2xl:w-[40%]" type="file" />
  </div>
  )
}

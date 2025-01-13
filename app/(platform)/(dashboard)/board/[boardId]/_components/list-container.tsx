"use client"

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd"

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

// 重新排列元素
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
 
  return result
}

export const ListContainer = ({
  data,
  boardId
}: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result

    if(!destination) {
      return
    }

    // 如果在相同的位置
    if (
      destination.drippableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // 用户移动列表
    if(type === "list") {
      const items = reorder(
        orderedData,
        source.index,
        destination.index,
      ).map((list, index) => ({ ...list, order: index }))

      setOrderedData(items)

      // 更新数据库
    }

    // 用户移动卡片
    if(type === "card") {
      let newOrderedData = [...orderedData]

      // 获取源列表和目标列表
      const sourceList = newOrderedData.find(list => list.id === source.droppableId)
      const destList = newOrderedData.find(list => list.id === destination.droppableId)

      // 未找到源列表或目标列表
      if(!sourceList || !destList) {
        return
      }

      // 检查卡片是否存在于源列表中
      if(!sourceList.cards) {
        sourceList.cards = []
      }

      // 检查卡片是否存在于目标列表中
      if(!destList.cards) {
        destList.cards = []
      } 

      // 在同一个列表中移动卡片
      if(source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx
        })

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData)

        // 更新数据库
      }
    }  
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => (
              <ListItem
                key={list.id}
                index={index}
                data={list}
              />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
} 
"use client"

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd"

import { useAction } from "@/hook/use-action";
import { ListWithCards } from "@/types";
import { updateListOrder } from "@/action/update-list-order";
import { updateCardOrder } from "@/action/update-card-order";

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

  const { execute: excuteUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("重新排序列表")
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const { execute: excuteUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("重新排序卡片")
    },
    onError: (error) => {
      toast.error(error)
    }
  })

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
      ).map((item, index) => ({ ...item, order: index }));

      setOrderedData(items);

      // 更新数据库 
      excuteUpdateListOrder({ items, boardId });
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
        excuteUpdateCardOrder({ 
          boardId: boardId,
          items: reorderedCards
        })
        // 更新数据库
        // 用户将卡片移动到另一个列表
      } else {
        // 从源列表删除卡
        const [moveCard] = sourceList.cards.splice(source.index, 1)

        // 将新的List附加到新的卡片
        moveCard.listId = destination.droppableId;

        // 添加卡片到目标列表
        destList.cards.splice(destination.index, 0, moveCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx
        })

        // 更新目标列表每张卡片的顺序
        destList.cards.forEach((card, idx) => {
          card.order = idx
        })

        setOrderedData(newOrderedData)
        // 更新
        excuteUpdateCardOrder({
          boardId: boardId,
          items: destList.cards
        })
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
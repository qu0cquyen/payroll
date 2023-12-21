/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import BottomNavigator from "#/components/bottom-navigator";
import MobileLayout from "#/components/layout/mobile-layout";
import AppBar from "#/components/ui/app-bar";
import { Dialog, DialogContent, DialogHeader } from "#/components/ui/dialog";

import { DialogTitle } from "@radix-ui/react-dialog";
import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

import ServiceRecords from "./_components/service-records";
import AddServiceRecord from "./_components/add-service-record";

import { format } from "date-fns";
import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import { cn } from "#/utils/cn";
import useCalendarState from "./_states/use-calendar-state";
import useServiceRecordState from "./_states/use-service-records-state";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    isCalendarOpen,
    selectedDate,
    onCalendarClick,
    onCalendarClose,
    onSelectDate,
  } = useCalendarState();

  return (
    <MobileLayout spacingTop={45} spacingBottom={45}>
      <MobileLayout.Top>
        <AppBar>
          <AppBar.Center className="!text-xl">Dashboard</AppBar.Center>
        </AppBar>
      </MobileLayout.Top>
      <MobileLayout.Content>
        <div className="flex flex-col gap-4 items-center">
          <Button
            className={cn(
              "w-[280px] justify-start text-left font-normal ",
              !selectedDate && "text-muted-foreground"
            )}
            outline={"primary"}
            name={"Date Picker"}
            onClick={() => onCalendarClick()}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />{" "}
            <p className="text-neutral-darkest">
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </p>
          </Button>
          <Dialog
            open={isCalendarOpen}
            onOpenChange={() => {
              onCalendarClose();
            }}
          >
            <DialogContent className=" rounded-md w-[95%] bg-white">
              <Calendar
                classNames={{
                  day_selected: "text-white !bg-primary",
                }}
                mode="single"
                selected={selectedDate!}
                onSelect={(date) => {
                  date && onSelectDate(date);
                  onCalendarClose();
                }}
                initialFocus
              />
            </DialogContent>
          </Dialog>
        </div>

        <ServiceRecords />

        <div
          className="fixed right-4 bottom-20 p-2 rounded-full bg-primary items-center"
          onClick={() => setIsOpen(true)}
        >
          <PlusIcon width={24} height={24} />
        </div>

        {/* Dialog */}
        <Dialog
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(false);
          }}
        >
          <DialogContent className="bg-white rounded-md w-[95%]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Add new record
              </DialogTitle>
            </DialogHeader>
            <AddServiceRecord onClick={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </MobileLayout.Content>
    </MobileLayout>
  );
};

export default HomePage;

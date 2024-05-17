import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  CalendarCheck,
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { VenueForm } from "./_components/venue-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { DateForm } from "./_components/date-form";

const CourseIdPage = async ({ params }: { params: { eventId: string } }) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const event = await db.event.findUnique({
    where: {
      id: params.eventId,
    },
  });

  const venues = await db.venue.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!event) {
    return redirect("/");
  }

  const requiredFields = [
    event.name,
    event.description,
    event.date,
    // event.price,
    event.venueId,
    // event.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const formatted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(event.date);

  return (
    <>
      {event.status === "DRAFT" && (
        <Banner label="This event is unpublished. It will not be visible to the students." />
      )}
      {event.status === "PUBLISHED" && (
        <Banner label="This event is published and visible to the students." />
      )}
      {event.status === "ARCHIVED" && (
        <Banner label="This event is archived and no longer visible to the students." />
      )}
      {/* {event.status === "PENDING" && (
        <Banner label="This event is pending and will be visible to the students once published." />
      )} */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Event</h1>
            <span className="text-sm text-slate-700">
              Review and update the event status {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            eventId={params.eventId}
            isPublished={event.status === "PUBLISHED"}
          />
        </div>
        {/* Event View Page */}
        <div className="p-6">
          <div className="flex items-center gap-x-2 mt-6">
            <IconBadge icon={File} />
            <h2 className="text-xl">Event Name</h2>
          </div>
          <p className="text-slate-700">{event.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Event Description</h2>
              </div>
              <p className="text-slate-700">{event.description}</p>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CalendarCheck} />
                <h2 className="text-xl">Event Date</h2>
              </div>

              <p className="text-slate-700">{formatted}</p>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Event Price</h2>
              </div>
              <p className="text-slate-700">{event.price}</p>
            </div>
            {/* <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Venue} />
              <h2 className="text-xl">Event Venue</h2>
            </div>
            <p className="text-slate-700">{event.venueId}</p>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;

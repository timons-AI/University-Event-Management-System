import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
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

const CourseIdPage = async ({ params }: { params: { eventId: string } }) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const event = await db.event.findUnique({
    where: {
      id: params.eventId,
      userId: user.id,
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
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            eventId={params.eventId}
            isPublished={event.status === "PUBLISHED"}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your event</h2>
            </div>
            <TitleForm initialData={event} eventId={event.id} />
            <DescriptionForm initialData={event} eventId={event.id} />
            {/* <ImageForm initialData={event} eventId={event.id} /> */}
            None
            <VenueForm
              initialData={event}
              eventId={event.id}
              options={venues.map((venue) => ({
                label: venue.name,
                value: venue.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              {/* <ChaptersForm initialData={event} eventId={event.id} /> */}
              None
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your event</h2>
              </div>
              <PriceForm initialData={event} eventId={event.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              {/* <AttachmentForm initialData={event} eventId={event.id} /> */}
              None
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;

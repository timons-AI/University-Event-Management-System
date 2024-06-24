"use server";
import { db } from "@/lib/db";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
//   const uotdata = months.map((month) => {
//     const usersInMonth = users.filter(
//       (user) =>
//         user.CreatedAt &&
//         user.CreatedAt.getMonth() === months.indexOf(month) &&
//         user.CreatedAt.getFullYear() === new Date().getFullYear()
//     );
//     return {
//       month,
//       users: usersInMonth.length,
//     };
//   });

//   const eotdata = months.map((month) => {
//     const eventsInMonth = events.filter(
//       (event) =>
//         event.date &&
//         event.date.getMonth() === months.indexOf(month) &&
//         event.date.getFullYear() === new Date().getFullYear()
//     );
//     return {
//       month,
//       events: eventsInMonth.length,
//     };
//   });

//   const eobdata = months.map((month) => {
//     const eventsInMonth = events.filter(
//       (event) =>
//         event.date &&
//         event.date.getMonth() === months.indexOf(month) &&
//         event.date.getFullYear() === new Date().getFullYear()
//     );
//     return {
//       month,
//       events: eventsInMonth.length,
//       bookings: eventsInMonth.reduce(
//         (acc, curr) => acc + curr.bookings.length,
//         0
//       ),
//     };
//   });

export const EventsOverTime = async () => {
  const events = await db.event.findMany();
  const data = months.map((month) => {
    const eventsInMonth = events.filter(
      (event) =>
        event.date &&
        event.date.getMonth() === months.indexOf(month) &&
        event.date.getFullYear() === new Date().getFullYear()
    );
    return {
      month,
      events: eventsInMonth.length,
    };
  });
  return { data };
};

export const UsersOverTime = async () => {
  const users = await db.user.findMany();
  const data = months.map((month) => {
    const usersInMonth = users.filter(
      (user) =>
        user.CreatedAt &&
        user.CreatedAt.getMonth() === months.indexOf(month) &&
        user.CreatedAt.getFullYear() === new Date().getFullYear()
    );
    return {
      month,
      users: usersInMonth.length,
    };
  });
  return { data };
};

export const BookingsOverTime = async () => {
  const events = await db.event.findMany({
    include: {
      bookings: true,
    },
  });
  const data = months.map((month) => {
    const eventsInMonth = events.filter(
      (event) =>
        event.date &&
        event.date.getMonth() === months.indexOf(month) &&
        event.date.getFullYear() === new Date().getFullYear()
    );
    return {
      month,
      events: eventsInMonth.length,
      bookings: eventsInMonth.reduce(
        (acc, curr) => acc + curr.bookings.length,
        0
      ),
    };
  });
  return { data };
};

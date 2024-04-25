import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { deleteRoomReview, getRoomReviews } from "@/backend/controllers/roomControllers";

import { NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import dbConnect from "@/backend/config/dbConnect";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getRoomReviews);
router
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .delete(deleteRoomReview);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

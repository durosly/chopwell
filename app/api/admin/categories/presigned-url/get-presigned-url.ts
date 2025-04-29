import { handleError } from "@/lib/handleError";
import s3 from "@/lib/s3";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";

async function getPresignedUrl(request: NextRequest) {
	try {
		const { searchParams } = request.nextUrl;
		const imgName = searchParams.get("imgName");

		let newImgName: string;

		if (!imgName) {
			newImgName = `${Date.now()}.png`;
		} else {
			const splitName = imgName.split(".");
			const coverName = splitName[0]
				.replace(/[^a-zA-Z0-9\s-]/g, "")
				.replace(/\s+/g, "-")
				.toLowerCase();
			newImgName = `${coverName}-${Date.now()}.${splitName[splitName.length - 1]}`;
		}

		const presignedUrl = await getSignedUrl(
			s3,
			new PutObjectCommand({
				Bucket: process.env.S3_BUCKET_NAME!,
				Key: newImgName,
			}),
			{ expiresIn: 3600 }
		);

		return Response.json({ url: presignedUrl, name: newImgName }, { status: 200 });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(getPresignedUrl);

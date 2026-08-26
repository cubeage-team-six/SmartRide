const customerService =
    require("../../services/customer/customer.service");

const sendResponse =
    require("../../helpers/response");

exports.getMyProfile =
    async (req, res, next) => {
        try {
            const result =
                await customerService.getMyProfile(
                    req.user.id
                );

            return sendResponse(
                res,
                200,
                "Customer profile fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    };

exports.updateMyProfile =
    async (req, res, next) => {
        try {
            const result =
                await customerService.updateMyProfile(
                    req.user.id,
                    req.body
                );

            return sendResponse(
                res,
                200,
                "Customer profile updated successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    };

exports.updateDrivingLicense =
    async (req, res, next) => {
        try {
            const result =
                await customerService
                    .updateDrivingLicense(
                        req.user.id,
                        req.body
                    );

            return sendResponse(
                res,
                200,
                "Driving license submitted successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    };
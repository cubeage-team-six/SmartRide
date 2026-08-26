const vendorService =
  require(
    "../../services/vendor/vendor.service"
  );

const sendResponse =
  require(
    "../../helpers/response"
  );


exports.getMyProfile =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await vendorService
          .getMyProfile(
            req.user.id
          );

      return sendResponse(
        res,
        200,
        "Vendor profile fetched successfully",
        result
      );

    } catch (error) {

      next(error);

    }

  };


exports.updateMyProfile =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await vendorService
          .updateMyProfile(
            req.user.id,
            req.body
          );

      return sendResponse(
        res,
        200,
        "Vendor profile updated successfully",
        result
      );

    } catch (error) {

      next(error);

    }

  };


exports.submitKyc =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await vendorService
          .submitKyc(
            req.user.id,
            req.body
          );

      return sendResponse(
        res,
        200,
        "Vendor KYC submitted successfully",
        result
      );

    } catch (error) {

      next(error);

    }

  };
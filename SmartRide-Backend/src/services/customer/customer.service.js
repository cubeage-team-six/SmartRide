const customerRepository =
    require("../../repositories/customer/customer.repository");

const { customerProfileDTO, } =
    require("../../dto/customer/customer.dto");
const AppError =
    require("../../utils/AppError");

exports.createCustomerProfile = async (
    userId
) => {
    const exists =
        await customerRepository.existsByUserId(
            userId
        );

    if (exists) {
        throw new AppError(
            "Customer profile already exists",
            409
        );
    }

    return customerRepository.create({
        userId,
    });
};

exports.getMyProfile = async (
    userId
) => {
    const customer =
        await customerRepository.findByUserId(
            userId
        );

    if (!customer) {
        throw new AppError(
            "Customer profile not found",
            404
        );
    }

    return customer;
};

exports.getMyProfile =
    async (userId) => {

        const customer =
            await customerRepository
                .findByUserId(userId);

        if (!customer) {
            throw new AppError(
                "Customer profile not found",
                404
            );
        }

        return customerProfileDTO(
            customer
        );
    };

exports.updateMyProfile = async (
    userId,
    data
) => {
    const customer =
        await customerRepository.findByUserId(
            userId
        );

    if (!customer) {
        throw new AppError(
            "Customer profile not found",
            404
        );
    }

    const updated =
        await customerRepository.updateByUserId(
            userId,
            data
        );

    return updated;
};

exports.updateDrivingLicense = async (
    userId,
    license
) => {
    const customer =
        await customerRepository.findByUserId(
            userId
        );

    if (!customer) {
        throw new AppError(
            "Customer profile not found",
            404
        );
    }

    return customerRepository.updateByUserId(
        userId,
        {
            drivingLicense: {
                ...license,

                verificationStatus:
                    "PENDING",
            },
        }
    );
};
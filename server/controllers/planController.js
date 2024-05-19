import mongoose from "mongoose";
import Trips from "../models/tripModel.js";
import Plans from "../models/planModel.js";

export const createPlanActivity = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      estimatedPrice,
      actualPrice,
    } = req.body;
    const { id } = req.params;

    const price = actualPrice ? actualPrice : estimatedPrice;

    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      estimatedPrice,
      actualPrice: price,
      startAddress,
      info,
      type: "activity",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho hoạt động thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPlanLodging = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      describe,
    } = req.body;
    const { id } = req.params;

    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      describe,
      type: "lodging",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho khách sạn thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPlanFlights = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      endAddress,
      estimatedPrice,
      actualPrice,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      arrivalGate,
      departureGate,
    } = req.body;
    const { id } = req.params;
    const price = actualPrice ? actualPrice : estimatedPrice;
    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      estimatedPrice,
      actualPrice: price,
      endAddress,
      arrivalGate,
      departureGate,
      type: "flights",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho chuyến bay thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPlanCar = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      phone,
      web,
      email,
      service,
      describe,
      form,
      estimatedPrice,
      actualPrice,
    } = req.body;
    const { id } = req.params;
    const price = actualPrice ? actualPrice : estimatedPrice;
    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      phone,
      web,
      email,
      service,
      describe,
      form,
      estimatedPrice,
      actualPrice: price,
      type: "car",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message: "Lập kế hoạch thuê xe thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createPlanConcert = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      form,
      estimatedPrice,
      actualPrice,
      departureGate,
    } = req.body;
    const { id } = req.params;
    const price = actualPrice ? actualPrice : estimatedPrice;
    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      form,
      estimatedPrice,
      actualPrice: price,
      departureGate,
      type: "concert",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho buổi hòa nhạc thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createPlanTheater = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      form,
      estimatedPrice,
      actualPrice,
      departureGate,
    } = req.body;
    const { id } = req.params;
    const price = actualPrice ? actualPrice : estimatedPrice;
    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      form,
      estimatedPrice,
      actualPrice: price,
      departureGate,
      type: "theater",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho buổi xem phim thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createPlanCamp = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      price,
      departureGate,
    } = req.body;
    const { id } = req.params;

    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      price,
      departureGate,
      type: "camp",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho cắm trại thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createPlanParking = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      estimatedPrice,
      actualPrice,
    } = req.body;
    const { id } = req.params;
    const price = actualPrice ? actualPrice : estimatedPrice;
    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      estimatedPrice,
      actualPrice: price,
      type: "parking",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho giữ xe thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createPlanRestaurant = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      describe,
      form,
      price,
    } = req.body;
    const { id } = req.params;

    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      describe,
      form,
      price,
      type: "restaurant",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho nhà hàng thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createPlanRail = async (req, res, next) => {
  try {
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      endAddress,
      estimatedPrice,
      actualPrice,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      arrivalGate,
      departureGate,
    } = req.body;
    const { id } = req.params;
    const price = actualPrice ? actualPrice : estimatedPrice;
    const plan = await Plans.create({
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      estimatedPrice,
      actualPrice: price,
      endAddress,
      arrivalGate,
      departureGate,
      type: "rail",
    });

    const trip = await Trips.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    trip.plans.push(plan._id);
    await trip.save();

    res.status(201).json({
      success: true,
      message:
        "Lập kế hoạch cho đường sắt thành công và đã được thêm vào chuyến đi",
      data: plan,
      tripId: trip._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getPlanById = async (req, res, next) => {
  try {
    const { planId } = req.params;

    const plan = await Plans.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: plan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePlanActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      estimatedPrice,
      actualPrice,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (info) updatedFields.info = info;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;
    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch cho hoạt động",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch hoạt động đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updatePlanFlights = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      endAddress,
      estimatedPrice,
      actualPrice,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      arrivalGate,
      departureGate,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (endAddress) updatedFields.endAddress = endAddress;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;
    if (info) updatedFields.info = info;
    if (phone) updatedFields.phone = phone;
    if (web) updatedFields.web = web;
    if (email) updatedFields.email = email;
    if (number) updatedFields.number = number;
    if (describe) updatedFields.describe = describe;
    if (form) updatedFields.form = form;
    if (arrivalGate) updatedFields.arrivalGate = arrivalGate;
    if (departureGate) updatedFields.departureGate = departureGate;

    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch chuyến bay",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch chuyến bay đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

export const updatePlanConcert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      form,
      estimatedPrice,
      actualPrice,
      departureGate,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (info) updatedFields.info = info;
    if (phone) updatedFields.phone = phone;
    if (web) updatedFields.web = web;
    if (email) updatedFields.email = email;
    if (number) updatedFields.number = number;
    if (form) updatedFields.form = form;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;
    if (departureGate) updatedFields.departureGate = departureGate;

    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch buổi hòa nhạc",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch buổi hòa nhạc đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
export const updatePlanTheater = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      number,
      form,
      estimatedPrice,
      actualPrice,
      departureGate,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (info) updatedFields.info = info;
    if (phone) updatedFields.phone = phone;
    if (web) updatedFields.web = web;
    if (email) updatedFields.email = email;
    if (number) updatedFields.number = number;
    if (form) updatedFields.form = form;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;
    if (departureGate) updatedFields.departureGate = departureGate;

    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch buổi xem phim",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch buổi xem phim đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
export const updatePlanCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      phone,
      web,
      email,
      service,
      describe,
      form,
      estimatedPrice,
      actualPrice,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (phone) updatedFields.phone = phone;
    if (web) updatedFields.web = web;
    if (email) updatedFields.email = email;
    if (service) updatedFields.service = service;
    if (describe) updatedFields.describe = describe;
    if (form) updatedFields.form = form;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;

    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch thuê xe",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch thuê xe đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

export const updatePlanParking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      info,
      phone,
      web,
      email,
      estimatedPrice,
      actualPrice,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (info) updatedFields.info = info;
    if (phone) updatedFields.phone = phone;
    if (web) updatedFields.web = web;
    if (email) updatedFields.email = email;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;

    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch đỗ xe",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch giữ xe đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
export const updatePlanRail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      planName,
      startDate,
      startTime,
      endDate,
      endTime,
      startAddress,
      endAddress,
      estimatedPrice,
      actualPrice,
      info,
      phone,
      web,
      email,
      number,
      describe,
      form,
      arrivalGate,
      departureGate,
    } = req.body;

    const updatedFields = {};
    if (planName) updatedFields.planName = planName;
    if (startDate) updatedFields.startDate = startDate;
    if (startTime) updatedFields.startTime = startTime;
    if (endDate) updatedFields.endDate = endDate;
    if (endTime) updatedFields.endTime = endTime;
    if (startAddress) updatedFields.startAddress = startAddress;
    if (endAddress) updatedFields.endAddress = endAddress;
    if (estimatedPrice) updatedFields.estimatedPrice = estimatedPrice;
    if (actualPrice) updatedFields.actualPrice = actualPrice;
    if (info) updatedFields.info = info;
    if (phone) updatedFields.phone = phone;
    if (web) updatedFields.web = web;
    if (email) updatedFields.email = email;
    if (number) updatedFields.number = number;
    if (describe) updatedFields.describe = describe;
    if (form) updatedFields.form = form;
    if (arrivalGate) updatedFields.arrivalGate = arrivalGate;
    if (departureGate) updatedFields.departureGate = departureGate;

    const plan = await Plans.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy kế hoạch tàu hỏa",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật kế hoạch tàu hỏa đã thành công.",
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

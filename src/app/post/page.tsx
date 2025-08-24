"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "@/components/atoms/FormField";
import MapPreview from "@/components/atoms/MapPreview";

type FormValues = {
  title: string;
  disasterType: string;
  severity: string;
  dateTime: string;
  location: string;
  lat: number;
  lon: number;
  description: string;
  source: string;
  casualties: string;
  damages: string;
  response: string;
  contacts: string;
};

export default function DisasterReportPage() {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      title: "",
      disasterType: "",
      severity: "",
      dateTime: new Date().toISOString().slice(0, 16),
      location: "",
      lat: 0,
      lon: 0,
      description: "",
      source: "",
      casualties: "",
      damages: "",
      response: "",
      contacts: "",
    },
  });

  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        setValue("lat", latitude);
        setValue("lon", longitude);
      });
    }
  }, [setValue]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-40">
      <h1 className="text-2xl font-bold mb-4">Báo cáo sự kiện thiên tai</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField<FormValues>
            name="title"
            control={control}
            label="Tiêu đề sự kiện"
            placeholder="Ví dụ: Bão số 5 đổ bộ vào miền Trung"
            rules={{ required: "Vui lòng nhập tiêu đề" }}
          />

          <FormField<FormValues>
            name="disasterType"
            control={control}
            label="Loại thiên tai"
            type="select"
            rules={{ required: "Vui lòng chọn loại thiên tai" }}
            options={[
              { label: "Bão", value: "Bão" },
              { label: "Lũ lụt", value: "Lũ lụt" },
              { label: "Động đất", value: "Động đất" },
              { label: "Cháy rừng", value: "Cháy rừng" },
              { label: "Hạn hán", value: "Hạn hán" },
              { label: "Sạt lở đất", value: "Sạt lở đất" },
              { label: "Sóng thần", value: "Sóng thần" },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField<FormValues>
            name="severity"
            control={control}
            label="Mức độ nghiêm trọng"
            type="select"
            rules={{ required: "Vui lòng chọn mức độ" }}
            options={[
              { label: "Nhẹ", value: "Nhẹ" },
              { label: "Trung bình", value: "Trung bình" },
              { label: "Nghiêm trọng", value: "Nghiêm trọng" },
              { label: "Thảm họa", value: "Thảm họa" },
            ]}
          />
          <FormField<FormValues>
            name="dateTime"
            control={control}
            label="Ngày giờ xảy ra"
            type="datetime"
          />
        </div>

        <FormField<FormValues>
          name="location"
          control={control}
          label="Địa điểm xảy ra"
          placeholder="Tỉnh/Thành phố hoặc tọa độ"
          rules={{ required: "Vui lòng nhập địa điểm" }}
        />

        <FormField<FormValues>
          name="description"
          control={control}
          label="Mô tả chi tiết"
          type="textarea"
          rules={{ required: "Vui lòng nhập mô tả" }}
        />

        <FormField<FormValues>
          name="source"
          control={control}
          label="Nguồn tin"
          rules={{ required: "Vui lòng nhập nguồn tin" }}
        />

        <FormField<FormValues> name="casualties" control={control} label="Thiệt hại về người" />
        <FormField<FormValues> name="damages" control={control} label="Thiệt hại về tài sản" />
        <FormField<FormValues> name="response" control={control} label="Hành động ứng phó" />
        <FormField<FormValues> name="contacts" control={control} label="Liên hệ khẩn cấp" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Gửi báo cáo
        </button>
      </form>

      {coords && <MapPreview lat={coords.lat} lon={coords.lon} />}
    </div>
  );
}

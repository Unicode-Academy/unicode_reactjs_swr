import useSWR from "swr";
import { fetcher } from "./utils/fetcher";
import { useState } from "react";
const provinceApiUrl = `https://vapi.vnappmob.com/api/province/`;
type ProvinceFetcher = {
  url: string;
  method?: string;
  headers?: HeadersInit;
};
type Province = {
  results: {
    province_id: string;
    province_name: string;
  }[];
};
type District = {
  results: {
    district_id: string;
    district_name: string;
  }[];
};
type Ward = {
  results: {
    ward_id: string;
    ward_name: string;
  }[];
};
export default function App() {
  const [provinceId, setProvince] = useState<string | null>(null);
  const [districtId, setDistrict] = useState<string | null>(null);
  const {
    data: { results: provinces },
  } = useSWR(
    { url: provinceApiUrl },
    ({ url, method = "GET", headers }: ProvinceFetcher) =>
      fetcher<Province>(url, method, null, headers),
    {
      fallbackData: {
        results: [],
      },
    }
  );
  const {
    data: { results: districts },
  } = useSWR(
    provinceId && { url: `${provinceApiUrl}district/${provinceId}` },
    ({ url, method = "GET", headers }: ProvinceFetcher) =>
      fetcher<District>(url, method, null, headers),
    {
      fallbackData: {
        results: [],
      },
    }
  );
  const {
    data: { results: wads },
  } = useSWR(
    districtId && { url: `${provinceApiUrl}ward/${districtId}` },
    ({ url, method = "GET", headers }: ProvinceFetcher) =>
      fetcher<Ward>(url, method, null, headers),
    {
      fallbackData: {
        results: [],
      },
    }
  );

  const handleChangeProvince = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setProvince(e.target.value);
  };
  const handleChangeDistrict = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDistrict(e.target.value);
  };

  return (
    <div>
      <select name="provinces" id="" onChange={handleChangeProvince}>
        <option value="0">Chọn Tỉnh/Thành phố</option>
        {provinces.map((province) => (
          <option key={province.province_id} value={province.province_id}>
            {province.province_name}
          </option>
        ))}
      </select>
      <select name="districts" id="" onChange={handleChangeDistrict}>
        <option value="0">Chọn Quận/Huyện</option>
        {districts.map((district) => (
          <option key={district.district_id} value={district.district_id}>
            {district.district_name}
          </option>
        ))}
      </select>
      <select name="wards" id="">
        <option value="0">Chọn Xã/Phường</option>
        {wads.map((ward) => (
          <option key={ward.ward_id} value={ward.ward_id}>
            {ward.ward_name}
          </option>
        ))}
      </select>
    </div>
  );
}

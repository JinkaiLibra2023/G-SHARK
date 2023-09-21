import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  GenerateScenarioRequest,
  GenerateScenarioResponse,
} from "../apis/generate";

const scenarioOptions = [
  "VPN 機器からの侵入",
];
const companyScaleOptions = [
  "小規模(クライアント数10-50)",
  "中規模(クライアント数50-5,000)",
  "大規模(クライアント数5,000-100,000)",
];

function Form() {
  const { register, handleSubmit } = useForm<
    GenerateScenarioRequest
  >();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        const resp: GenerateScenarioResponse = {
          scenario: data.scenario,
          background:
            `企業AはクライアントPC10台を持つ中規模の企業で、顧客情報などの機密情報を保持しています。
          最近、企業AのVPN機器に対する不正なアクセスが検出され、認証情報の一部が窃取された可能性があることが判明しました。`,
          networkFigure: `@startuml
          nwdiag {
            network dmz {
                address = "210.x.x.x/24"
          
                web01 [address = "210.x.x.1"];
                web02 [address = "210.x.x.2"];
            }
          }
          @enduml`,
          attackerObjective:
            "攻撃者はVPN機器への侵入に成功し、認証情報を窃取しました。...",
          attackerProcedure:
            "攻撃者はVPN機器への侵入に成功し、認証情報を入手します。...",
          exercisePurpose:
            "クライアントPCのセキュリティ意識向上と攻撃からの防御方法の確立。...",
        };
        navigate("/result", {
          state: { generateResponse: resp },
        });
      })}
      className="flex flex-col mt-[50px] mx-auto w-[60%] p-10 items-center"
    >
      <table className="w-[100%] border-spacing-2">
        <tbody>
          <InputRow
            labelName="シナリオ"
            element={
              <select
                className="w-[100%]"
                {...register("scenario")}
              >
                {scenarioOptions.map((so) => (
                  <option value={so} key={so}>{so}</option>
                ))}
              </select>
            }
          />
          <InputRow
            labelName="起点"
            element={
              <input
                className="w-[100%]"
                {...register("startingPoint")}
              />
            }
          />
          <InputRow
            labelName="対象組織名"
            element={
              <input
                className="w-[100%]"
                {...register("targetCompanyName")}
              />
            }
          />
          <InputRow
            labelName="企業規模"
            element={
              <select
                className="w-[100%]"
                {...register("companyScale")}
              >
                {companyScaleOptions.map((cso) => (
                  <option value={cso} key={cso}>{cso}</option>
                ))}
              </select>
            }
          />
          <InputRow
            labelName="オプション"
            element={
              <textarea
                className="w-[100%]"
                rows={6}
                {...register("option")}
              />
            }
          />
        </tbody>
      </table>

      {/* TODO: この className どうにかしたい */}
      <button
        type="submit"
        className={`text-white bg-gray-700 hover:bg-gray-800 
          focus:ring-4 focus:ring-gray-300 font-medium
          rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
          dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none
          dark:focus:ring-gray-800
          mt-5 w-32`}
      >
        Generate
      </button>
    </form>
  );
}

function InputRow(props: {
  labelName: string;
  element: JSX.Element;
}) {
  return (
    <tr>
      <td className="pt-2 px-2" valign="top">
        <p className="bg-gray-300 text-center">
          {props.labelName}
        </p>
      </td>
      <td className="pt-2" valign="top">
        {props.element}
      </td>
    </tr>
  );
}

export default Form;
import client from "../../client";
import nodemailer from "nodemailer";
function generateRandomCode() {
  const length = 6; // 난수의 길이
  let code = "";

  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10); // 0부터 9까지의 난수를 추가
  }

  return code;
}

export default {
  Mutation: {
    authEmail: async (_, { emailAdd }) => {
      const addr = await client.user.count({
        where: {
          email: emailAdd,
        },
      });
      console.log(addr);
      if (addr > 0) {
        return {
          ok: false,
          message:
            "이미 존재하는 이메일입니다.(이메일 1개당 계정 1개 생성가능)",
        };
      }

      const randomCode = generateRandomCode();
      const transporter = nodemailer.createTransport({
        service: "gmail", // 예: Gmail, Yahoo 등
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      // 이메일 보내는 함수

      try {
        const mailOptions = {
          from: "PET_PEO",
          to: emailAdd,
          subject: "이메일 인증 코드",
          html: `<p><h3>아래의 인증코드를 입력하여주세요 &#x1F64F;</h3><h4 style="margin-top:10px;">[ <span style="color:#d42643">${randomCode}</span> ]</h4> </p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("이메일이 성공적으로 전송되었습니다.");
        return {
          ok: true,
          message: "이메일이 해당 주소로 발송되었습니다.",
          code: randomCode,
        };
      } catch (error) {
        console.error("이메일 전송 중 오류가 발생했습니다.", error);
        return {
          ok: false,
          message: `이메일 전송 중 오류가 발생하였습니다.`,
        };
      }
    },
  },
};

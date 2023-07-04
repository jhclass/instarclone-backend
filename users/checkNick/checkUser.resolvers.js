import client from "../../client";
export default {
  Query: {
    checkUser: async (_, { temporaryUser }) => {
      const regex = /^[A-Za-z0-9]+$/;
      const isEnglish = regex.test(temporaryUser);
      if (isEnglish) {
        const checkNick = await client.user.count({
          where: {
            username: temporaryUser,
          },
        });
        if (checkNick > 0) {
          return {
            ok: false,
            message: " 이미 존재하는 아이디 입니다.",
          };
        } else {
          return {
            ok: true,
            message: " 사용가능한 아이디 입니다.",
          };
        }
      } else {
        return {
          ok: false,
          message: "영어 대소문자와 숫자로만 구성된 아이디를 입력해주세요.",
        };
      }
    },
  },
};

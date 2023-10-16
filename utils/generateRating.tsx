import Image from "next/image";

export const GenerateRateing = (
  rating: number,
  w: number = 20,
  h: number = 20
) => {
  const stars = [];
  for (let j = 1; j <= Math.floor(rating); j++) {
    stars.push(
      <Image
        key={`star-${j}`}
        src={`/static/icon/star.svg`}
        width={w}
        height={h}
        alt="star"
      />
    );
  }

  if (String(rating).includes(".")) {
    stars.push(
      <Image
        key={`half-star`}
        src={`/static/icon/half-star.svg`}
        width={w}
        height={h}
        alt="star"
      />
    );
  }

  if (Math.ceil(rating) > 0) {
    for (let i = 1; i <= 5 - Math.ceil(rating); i++) {
      stars.push(
        <Image
          key={`empety-star-${i}`}
          src={`/static/icon/empty-star.svg`}
          width={20}
          height={20}
          alt="star"
        />
      );
    }
  }
  return stars;
};

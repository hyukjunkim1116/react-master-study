import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getAiringTodayTv,
  getTopRatedTv,
  getPopularTv,
  getLatestTv,
  IGetTvResults } from "../api";
import { makeImagePath,makeComingSoonImg,makeNoImg } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  &.branch_0 {
  position: relative;
  top: -100px;
}
  &.branch_1 {
    margin-top:150px;
  }
  &.branch_2 {
    margin-top:250px;
  }
  &.branch_3 {
    margin-top:250px;
  }
`;


const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: any }>`
  background-color: purple;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigTv = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
  font-weight:400;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;
const BranchTitle = styled.h2`
  padding:10px;
  margin-left:10px;
`

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};


const offset = 6;

function Tv() {

  const {data : nowAiringData, isLoading : nowAiringDataLoading} = useQuery<IGetTvResults>(["airingTv", "nowAiring"], getAiringTodayTv);
  const {data : topRateData, isLoading : topRatedDataLoading } = useQuery<IGetTvResults>(["tv", "topRated"], getTopRatedTv);
  const {data : latestData, isLoading : latestDataLoading } = useQuery(["tv", "latest"], getLatestTv);
  const {data : popularData, isLoading : popularDataLoading } = useQuery<IGetTvResults>(["tv", "popular"], getPopularTv);
  const data = [ nowAiringData, topRateData, popularData,latestData]
  const isLoading = ( nowAiringDataLoading && topRatedDataLoading   && popularDataLoading&&latestDataLoading)
  const [branch, setbranch] = useState(0);
  const currentDataBranch = data[branch]
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const history = useHistory();
  const bigTvMatch:any = useRouteMatch<{ tvId: any}>("/tv/:tvId");
  const { scrollY } = useViewportScroll();
  const clickedTv =
  bigTvMatch?.params.tvId &&
  currentDataBranch?.results?.find((tv:any)=> tv.id === +bigTvMatch.params.tvId)
const clickedLatestTv =
bigTvMatch?.params.tvId && currentDataBranch
  console.log(clickedLatestTv)
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number, branch:number) => {
    history.push(`/tv/${tvId}`);
    setbranch(branch)
  };
  const onOverlayClick = () => history.push("/tv");
  const increseIndex = () => {
    if (currentDataBranch) {
      if (leaving) return;
      toggleLeaving();
      const totalTvs = currentDataBranch?.results?.length ===0 ? 1 : currentDataBranch?.results?.length - 1 
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increseIndex}
            bgPhoto={makeImagePath(topRateData?.results[0].backdrop_path || "")}
          >
            <Title>{topRateData?.results[0].name}</Title>
            <Overview>{topRateData?.results[0].overview}</Overview>
          </Banner>
          {[0,1, 2,3].map(i => (
            <>
            { i !==3 ?
          <Slider className={`branch_${i}`}>
          <BranchTitle>
                    {i === 0 ? "On Airing" :  i === 1 ? "TopRated " : i === 2 ? "Popular " : "Latest"}
            </BranchTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
             {data[i]?.results?.slice(1).slice(offset * index, offset * index + offset).map((tv:any) => (
                    <Box
                      layoutId={String(`${tv.id-i}`)}
                      key={String(`${tv.id-i}`)}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(tv.id,i)}
                      transition={{ type: "tween" }}
                      bgPhoto={tv.backdrop_path ? makeImagePath(tv.backdrop_path, "w500") :makeNoImg }
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
                  </Row>
            </AnimatePresence>
          </Slider> :
          <Slider className={`branch_${i}`}>
          <BranchTitle>
          Latest
            </BranchTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                    <Box
                      layoutId={String(`${data[3]?.id-i}`)}
                      key={String(`${data[3]?.id-i}`)}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(data[3]?.id,i)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeComingSoonImg}
                    >
                      <Info variants={infoVariants}>
                        <h4>{data[3]?.name}</h4>
                      </Info>
                    </Box>
                  </Row>
            </AnimatePresence>
          </Slider>
          }
          

          </>
          ))}


{[0,1, 2,3].map(i => (
  <AnimatePresence>
  {bigTvMatch && (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigTv
        style={{ top: scrollY.get() + 100 }}
        layoutId={String(`${bigTvMatch.params.tvId-i}`)}
      >
        
        { clickedTv  &&(
          <>
            <BigCover
          style={{
              backgroundImage: clickedTv.backdrop_path ? `linear-gradient(to top, black, transparent),url(${makeImagePath(clickedTv.backdrop_path,"w500")})` : `linear-gradient(to top, black, transparent),url(${makeNoImg})`
            }}
            />
            <BigTitle>{clickedTv.name}</BigTitle>
            <BigOverview>{clickedTv.overview.slice(0,300)}...</BigOverview>
          </>
        )}
        { clickedLatestTv && !clickedTv && i===3 && (
          <>
            <BigCover
          style={{
              backgroundImage: clickedLatestTv.backdrop_path ? `linear-gradient(to top, black, transparent),url(${makeImagePath(clickedLatestTv.backdrop_path,"w500")})` : `linear-gradient(to top, black, transparent),url(${makeNoImg})`
            }}
            />
            <BigTitle>{clickedLatestTv.name}</BigTitle>
            <BigOverview>{clickedLatestTv.overview}</BigOverview>
          </>
        )}
       
        
      </BigTv>
    </>
  )}
  </AnimatePresence>




           ))}
    



        </>
      )}
    </Wrapper>
  );
}
{/* { i===3 ? (
          <>
            <BigCover
          style={{
              backgroundImage: clickedLatestTv.backdrop_path ? `linear-gradient(to top, black, transparent),url(${makeImagePath(clickedLatestTv.backdrop_path,"w500")})` : `linear-gradient(to top, black, transparent),url(${makeNoImg})`
            }}
            />
            <BigTitle>{clickedLatestTv.name}</BigTitle>
            <BigOverview>{clickedLatestTv.overview ? clickedLatestTv.overview : "No overview"}</BigOverview>
                      <BigOverview>Status : {clickedLatestTv.status }</BigOverview>
          </>
        ):null} */}
export default Tv;

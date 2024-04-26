import React, { useEffect, useState } from "react";
import { DetailsMessage, GetDetailsResponse, GetDetailsResponseMessage, MessageType } from "../types";
import Loader from "./loader";
import ScoreOmeter from "./score-ometer";
import "./aikido-comp.css";
import NotLoggedIn from "./not-logged-in";
import NotConnected from "./not-connected";
import IssuesRow from "./issues-row";
import NoIssues from "./no-issues";

const criticalThreshold = 90;
const highThreshold = 70;
const mediumThreshold = 40;

const AikidoComp = (props: {
  repoName: string;
  repoOwner: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [data, setData] = useState<GetDetailsResponse | undefined>(undefined);
  const [highestScore, setHighestScore] = useState(0);
  const [critical, setCritical] = useState(0);
  const [high, setHigh] = useState(0);
  const [medium, setMedium] = useState(0);
  const [low, setLow] = useState(0);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request: GetDetailsResponseMessage, sender, sendResponse) => {
      if (request.type === MessageType.GET_DETAILS_RESPONSE) {
        setData(request.payload);
        setLoggedIn(true);
        if (request.payload) {

          // Calculate highest score
          if (request.payload.issues.length === 0) {
            setHighestScore(0);
          } else {
            setHighestScore(Math.max(
              ...request.payload.issues.map(i => i.aikido_priority)
            ));
          }

          // Calculate the number of issues in each category
          let tempCritical = 0;
          let tempHigh = 0;
          let tempMedium = 0;
          let tempLow = 0;
          for (const issue of request.payload.issues) {
            if (issue.aikido_priority >= criticalThreshold) tempCritical++;
            else if (issue.aikido_priority >= highThreshold) tempHigh++;
            else if (issue.aikido_priority >= mediumThreshold) tempMedium++;
            else tempLow++;
          }
          setCritical(tempCritical);
          setHigh(tempHigh);
          setMedium(tempMedium);
          setLow(tempLow);

        }
        setLoading(false);
      } else if (request.type === MessageType.NOT_LOGGED_IN) {
        setLoggedIn(false);
        setLoading(false);
      }
    });
  }, []);

  const refresh = () => {
    if (data) {
      chrome.runtime.sendMessage<DetailsMessage>({
        type: MessageType.GET_DETAILS,
        payload: {
          repoName: props.repoName,
          repoOwner: props.repoOwner,
        }
      });
      setLoading(true);
    }
  }

  return (
    <>
      <div className="aik-container">

        {loading ? <>
          <div className="aik-loading-container">
            <Loader />
          </div>
        </> : <>
          {loggedIn ? <>
            {data ? <>
              <div className="aik-main-row">
                {data.issues.length > 0 ? <>
                  <div className="score-ometer-container">
                    <ScoreOmeter score={highestScore} />
                  </div>
                </> : <>
                  <NoIssues />
                </>}
                <div className="aik-main-row-column">
                  {data.issues.length > 0 ? <>
                    <IssuesRow critical={critical} high={high} medium={medium} low={low} />
                  </> : <></>}
                  <div className="aik-extra-info">
                    <button onClick={refresh}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path stroke="#6551F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"></path>
                      </svg>
                    </button>
                    <a
                      href={`https://app.aikido.dev/repositories/${data.repo.id}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      this repo on Aikido.dev
                    </a>
                  </div>
                </div>
              </div>
            </> : <>
              <NotConnected />
            </>}
          </> : <>
            <NotLoggedIn repoName={props.repoName} repoOwner={props.repoOwner} />
          </>}
        </>}

        <div className="aik-powered-by">
          <span>powered by Aikido.dev</span>
        </div>
      </div>
    </>
  );
};

export default AikidoComp;

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import useSWR from "swr";

function App() {
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [chains, setChains] = useState([]);
  const [chainId, setChainId] = useState();
  const [nodeId, setNodeId] = useState();
  const [loader, setLoader] = useState(false);
  const [live, setLive] = useState(false);
  const [blockNumber, setBlockNumber] = useState();
  const [showRpc, setShowRpc] = useState(false);
  // const chains = [
  //   {
  //     name: "Ethereum",
  //     id: "Ethereum",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Ethereum Mainnet",
  //         value: "1",
  //         networkRpc: "https://rpc.ankr.com/eth",
  //       },
  //       {
  //         label: "Goerli Testnet",
  //         value: "5",
  //         networkRpc: "https://rpc.ankr.com/eth_goerli",
  //       },
  //       {
  //         label: "Sepolia Testnet",
  //         value: "11155111",
  //         networkRpc: "https://rpc.sepolia.org/",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Polygon",
  //     id: "Polygon",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Polygon Mainnet",
  //         value: "137",
  //         networkRpc: "https://rpc.ankr.com/polygon",
  //       },
  //       {
  //         label: "Polygon Testnet",
  //         value: "80001",
  //         networkRpc: "https://rpc.ankr.com/polygon_mumbai",
  //       },
  //     ],
  //   },

  //   {
  //     name: "Arbitrum",
  //     id: "Arbitrum",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Arbitrum Mainnet",
  //         value: "42161",
  //         networkRpc: "https://arb1.arbitrum.io/rpc",
  //       },
  //       {
  //         label: "Arbitrum Goerli",
  //         value: "421613",
  //         networkRpc:
  //           "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Optimism",
  //     enabled: true,
  //     id: "Optimism",
  //     options: [
  //       {
  //         label: "Optimism Mainnet",
  //         value: "10",
  //         networkRpc: "https://mainnet.optimism.io",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Fantom",
  //     id: "Fantom",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Fantom Mainnet",
  //         value: "250",
  //         networkRpc: "https://rpc.fantom.network",
  //       },
  //       {
  //         label: "Fantom Testnet",
  //         value: "4002",
  //         networkRpc: "https://rpc.ankr.com/fantom_testnet",
  //       },
  //     ],
  //   },

  //   {
  //     name: "Avalanche",
  //     enabled: true,
  //     id: "Avalanche",
  //     options: [
  //       {
  //         label: "Avalanche Mainnet",
  //         value: "43114",
  //         networkRpc: "https://rpc.ankr.com/avalanche",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Binance",
  //     enabled: true,
  //     id: "Binance",
  //     options: [
  //       {
  //         label: "Binance Smart Chain",
  //         value: "56",
  //         networkRpc: "https://rpc.ankr.com/bsc",
  //       },
  //       {
  //         label: "BSC Testnet",
  //         value: "97",
  //         networkRpc:
  //           "https://little-palpable-seed.bsc-testnet.discover.quiknode.pro/9a49cf2c027187fa38ffe27450ca3e49daa49420",
  //       },
  //     ],
  //   },

  //   {
  //     name: "zkEVM polygon",
  //     id: "zkPolygon",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Polygon zkEVM",
  //         value: "1101",
  //         networkRpc: "https://zkevm-rpc.com",
  //       },
  //     ],
  //   },

  //   {
  //     name: "Linea",
  //     id: "linea",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Linea Mainnet",
  //         value: "59144",
  //         networkRpc: "https://rpc.linea.build",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Gnosis",

  //     id: "gnosis",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Gnosis",
  //         value: "100",
  //         networkRpc: "https://rpc.ankr.com/gnosis",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Omni",
  //     id: "omni",
  //     enabled: true,
  //     options: [
  //       {
  //         label: "Omni Testnet",
  //         value: "165",
  //         networkRpc: "https://testnet.omni.network",
  //       },
  //     ],
  //   },

  //   {
  //     name: "None",
  //     enabled: true,
  //     id: "None",
  //   },
  // ];

  function resetButton() {
    setSelectedChain("");
    setSelectedOption();
    setNodeId();
    setBlockNumber();
    setLoader(false);
    setLive(false);
  }

  const handleChainChange = (event) => {
    setSelectedChain(event.target.value);
    console.log("-----" + event.target.value);
    setSelectedOption("");
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    async function getChains() {
      const config = {
        method: "get",
        url: `https://backend.dev.buildbear.io/user/chains`,
        headers: {
          Authorization: `Bearer BB_a55d709e-4f81-973a-9513-6681d36e0970`,
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await axios(config);
        console.log(res?.data);
        setChains(res?.data);
      } catch (_) {}
    }
    getChains();
  }, []);

  async function createNode() {
    const data = JSON.stringify({
      chainId: selectedOption,
    });

    const config = {
      method: "post",
      // url: `https://backend.dev.buildbear.io/api/createfork`,
      url: `https://api.dev.buildbear.io/v1/buildbear-sandbox`,
      headers: {
        Authorization: `Bearer BB_a55d709e-4f81-973a-9513-6681d36e0970`,
        "Content-Type": "application/json",
      },
      data,
    };
    try {
      const res = await axios(config);
      console.log("post", res);
      // console.log("post", res?.data);
      setNodeId(res?.data?.sandboxId);
      setBlockNumber(res?.data?.forkingDetails?.blockNumber);
    } catch (_) {}
    setLoader(false);
  }

  async function getNodeDetails() {
    const config = {
      method: "get",
      url: `https://backend.dev.buildbear.io/user/container/${nodeId}`,
      headers: {
        Authorization: `Bearer BB_a55d709e-4f81-973a-9513-6681d36e0970`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios(config);
      console.log(res?.data);
      if (res.status === 200) {
        setLive(true);
      }
    } catch (_) {}
  }

  const containerApi = useSWR(
    nodeId ? "/user/container" : null,
    getNodeDetails,
    {
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    if (selectedChain) {
      const selectedChainObject = chains.find(
        (chain) => chain.id === selectedChain
      );
      if (selectedChainObject) {
        setSelectedOption(selectedChainObject.options[0]?.value);
      }
    }
  }, [selectedChain, chains]);

  return (
    <div className="App">
      <header className="App-header">
        <div
          className=" "
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: "60px",
            }}
          >
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle cx="23.9993" cy="24.0013" r="21.7982" fill="white" />
              <path
                d="M7.41216 7.41213C11.6572 3.16709 17.5219 0.541692 23.9996 0.541692C30.4774 0.541692 36.3421 3.16709 40.5871 7.41213C44.8321 11.6572 47.4575 17.5218 47.4575 23.9996C47.4575 30.4774 44.8321 36.342 40.5871 40.5871C36.3421 44.8321 30.4774 47.4575 23.9996 47.4575C17.5219 47.4575 11.6572 44.8321 7.41216 40.5871C3.16712 36.342 0.541714 30.4774 0.541714 23.9996C0.541714 17.5218 3.16712 11.6572 7.41216 7.41213M23.9996 0C17.3721 0 11.3724 2.68671 7.02956 7.02954C2.68674 11.3724 2.73848e-05 17.3728 2.73848e-05 24.0004C2.73848e-05 30.6279 2.68596 36.6276 7.02956 40.9704C11.3724 45.3133 17.3729 48 23.9996 48C30.6264 48 36.6269 45.3133 40.9705 40.9704C45.3133 36.6276 48 30.6271 48 24.0004C48 17.3736 45.3133 11.3731 40.9705 7.02954C36.6276 2.68671 30.6272 0 23.9996 0V0Z"
                fill="white"
              />
              <path
                d="M16.9133 44.1588L26.1861 32.3683L36.9802 34.452L40.4434 32.0502L36.3018 27.2613V24.0904L36.2354 23.9199L32.0489 19.2315L31.9086 19.1496L15.164 15.8008L15.037 15.8082L2.80442 19.6338L2.9572 20.1246L15.1271 16.3182L31.7249 19.6382L35.7867 24.1871V27.3558L35.8501 27.5241L39.6816 31.9542L36.8665 33.9065L25.9758 31.8044L16.5088 43.8414L16.9133 44.1588Z"
                fill="#1F211F"
              />
              <path
                d="M31.6285 25.513C31.7673 25.3743 31.9592 25.2886 32.171 25.2886C32.3829 25.2886 32.5748 25.3743 32.7135 25.513C32.8523 25.6518 32.9379 25.8437 32.9379 26.0555C32.9379 26.2674 32.8523 26.4593 32.7135 26.598C32.5748 26.7368 32.3829 26.8224 32.171 26.8224C31.9592 26.8224 31.7673 26.7368 31.6285 26.598C31.4898 26.4593 31.4041 26.2674 31.4041 26.0555C31.4041 25.8437 31.4905 25.6518 31.6285 25.513ZM32.171 24.7734C31.8175 24.7734 31.4964 24.9166 31.2646 25.1491C31.0329 25.3809 30.8889 25.702 30.8889 26.0555C30.8889 26.4091 31.0321 26.7302 31.2646 26.9619C31.4964 27.1937 31.8175 27.3376 32.171 27.3376C32.5246 27.3376 32.8457 27.1944 33.0774 26.9619C33.3092 26.7302 33.4531 26.4091 33.4531 26.0555C33.4531 25.702 33.3099 25.3809 33.0774 25.1491C32.8449 24.9174 32.5246 24.7734 32.171 24.7734Z"
                fill="#1F211F"
              />
              <path
                d="M6.28337 35.5576L26.5215 32.2723L15.3259 15.9062L14.9015 16.1956L25.6409 31.8951L6.20145 35.0505L6.28337 35.5576Z"
                fill="#1F211F"
              />
              <path
                d="M31.2363 25.5656L19.8658 22.8206L6.72829 34.5262L10.4306 21.3909L15.3006 16.2271L14.9264 15.875L10.0129 21.0845L9.95307 21.1916L5.99461 35.234L6.41312 35.4953L20.0083 23.383L31.116 26.0645L31.2363 25.5656Z"
                fill="#1F211F"
              />
              <path
                d="M33.2011 25.8205L36.1602 24.3177L35.9284 23.8594L32.9701 25.3622L33.2011 25.8205Z"
                fill="#1F211F"
              />
              <path
                d="M31.4183 25.3182L15.2435 15.832L14.9837 16.2742L31.1585 25.7603L31.4183 25.3182ZM37.1445 34.0492L32.9108 26.8121L32.4686 27.0719L36.7024 34.309L37.1445 34.0492Z"
                fill="#1F211F"
              />
              <path
                d="M32.1172 19.3874L32.3828 25.0195L31.8697 25.0437L31.6041 19.4116L32.1172 19.3874Z"
                fill="#1F211F"
              />
              <path
                d="M33.2268 26.1412L36.127 27.1133L35.9639 27.5997L33.0638 26.6276L33.2268 26.1412Z"
                fill="#1F211F"
              />
              <path
                d="M35.4082 33.646L20.0844 22.8919L19.984 22.8498L2.92788 19.625L2.83341 20.1299L19.8342 23.3443L35.113 34.066L35.4082 33.646Z"
                fill="#1F211F"
              />
              <path
                d="M16.9613 44.0475L19.1602 33.1907L10.4077 21.1094L9.99141 21.4113L18.6125 33.311L16.4587 43.9471L16.9613 44.0475Z"
                fill="#1F211F"
              />
              <path
                d="M12.9183 34.1921L15.2871 43.1641L14.7904 43.2952L12.4216 34.3232L12.9183 34.1921Z"
                fill="#1F211F"
              />
              <path
                d="M8.4082 28.1073L2.8547 22.125L2.47901 22.4749L8.03251 28.4572L8.4082 28.1073Z"
                fill="#1F211F"
              />
              <path
                d="M27.0049 14.4527L24.099 21.3606L24.4326 21.6972L30.5234 19.1773L27.1938 14.0039L27.0049 14.4527ZM24.8135 20.9842L27.2891 15.1007L29.7588 18.9381L24.8135 20.9842Z"
                fill="#1F211F"
              />
            </svg>
            <div>Buildbear</div>
          </div>
          <button
            className="ide-button"
            onClick={() => {
              resetButton();
            }}
          >
            Reset
          </button>
        </div>

        {/* <label for="cars" style={{ marginBottom: "10px", fontSize: "20px" }}>
          Select a chain:
        </label> */}
        <div></div>
        {/* <select
          name="cars"
          id="cars"
          style={{
            height: "34px",
            borderRadius: "5px",
            backgroundColor: "#35384c",
            color: "white",
          }}
        >
          <option value="volvo">Etherium</option>
          <option value="saab">Polygon</option>
          <option value="opel">Binance</option>
          <option value="audi">Omni</option>
        </select> */}

        {/* <select
          name="cars"
          id="cars"
          style={{
            height: "34px",
            borderRadius: "5px",
            backgroundColor: "#35384c",
            color: "white",
          }}
          // value={selectedOption} onChange={handleSelectChange}
        >
          {chains.map((chain) => (
            <option value={chain.name}>{chain.name}</option>
          ))}
        </select> */}

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              marginBottom: "10px",
              gap: "10px",
              fontSize: "22px",
              marginTop: "16px",
            }}
          >
            <label style={{ display: "flex" }}>Select a chain: </label>
            <select
              style={{
                height: "34px",
                borderRadius: "5px",
                backgroundColor: "#35384c",
                color: "white",
              }}
              value={selectedChain}
              onChange={handleChainChange}
            >
              {chains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>

          {selectedChain && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                fontSize: "22px",
                marginTop: "16px",
              }}
            >
              <label style={{ display: "flex" }}>Select an option: </label>
              <select
                style={{
                  height: "34px",
                  borderRadius: "5px",
                  backgroundColor: "#35384c",
                  color: "white",
                }}
                value={selectedOption}
                onChange={handleOptionChange}
              >
                {chains
                  .find((chain) => chain.id === selectedChain)
                  ?.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <>
            {selectedOption ? (
              <>
                {/* <div style={{ fontSize: "22px" }}>
                  <p>Selected Chain Id: {selectedOption}</p>
                </div> */}
              </>
            ) : (
              ""
            )}
          </>
        </div>

        <div style={{}}>
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {selectedOption && !nodeId && (
              <button
                onClick={() => {
                  createNode();
                  setLoader(true);
                }}
                className="ide-button"
              >
                Create Testnet
              </button>
            )}
            {loader && <div class="loader"></div>}
          </div>

          <br />

          <div style={{ fontSize: "20px" }}>
            {nodeId && (
              <div
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                Node Id: {nodeId}{" "}
                {live ? (
                  <span className="live-node "></span>
                ) : (
                  <span className=" notlive-node"></span>
                )}{" "}
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "20px",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            {blockNumber && (
              <div style={{ marginBottom: "16px", fontSize: "18px" }}>
                {" "}
                Blocknumber : {blockNumber}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "10px",
            }}
          >
            {nodeId ? (
              <>
                <button
                  onClick={() => {
                    setShowRpc(!showRpc);
                  }}
                  className="ide-button"
                >
                  View Rpc
                </button>
                {showRpc && <div style={{ backgroundColor: "#35384c", fontSize: "14px", padding: "10px 12px", display: "flex", gap: "16px", alignItems: "center" }}  ><div>rpc.dev.buildbear.io/{nodeId} </div> <button className="ide-button" >Copy</button> </div>}

                <a
                  href={`https://explorer.dev.buildbear.io/${nodeId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="ide-button">View Exploer</button>
                </a>
                <a
                  href={`https://faucet.dev.buildbear.io/${nodeId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="ide-button">View Faucet</button>
                </a>
              </>
            ) : (
              ""
            )}
          </div>
          {/* <button
            onClick={() => {
              getNodeDetails();
            }}
            className="ide-button"
          >
            Get Details
          </button> */}
        </div>
      </header>
    </div>
  );
}

export default App;

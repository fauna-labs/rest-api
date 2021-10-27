This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with [Fauna][fauna]. All [Fauna Labs][fauna-labs] repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the [Fauna organization][fauna-organization].

---

# UDF API

An intelligent routing layer for invoking user-defined functions (UDFs) in Fauna via a REST API. Presented along with the talk "Building data-driven APIs at the edge" at [API World 2021][api-world-talk].

## Invoking the deployed API

You can use the deployed API to invoke UDFs in your own Fauna account. If you do not have a Fauna account, you can [sign up for one][fauna-signup] and take advantage of the free tier to test this API.

### Creating a UDF

1. Create a new database or choose an existing database in your account. Take note of the region group where you placed your database, as you will use it to construct the URL for your API calls.
1. Navigate to the *Functions* tab in your database, and choose *New Function* to create a UDF.
1. Name your function "Greeter" and paste the following FQL into the *Function Body* field:
    ```fql
    Query(Lambda(
      "name",
      Concat(["Hello, ", Var("name"), "!"])
    ))
    ```
1. Leave the *Role* set to the default of *None* and choose *Save* to create your UDF.

### Testing your UDF

1. Navigate to the *Shell* tab and paste the following FQL into the query window in the bottom half of the screen, replacing *<YOUR_NAME>* with your name:
    ```fql
    Call(
      "Greeter",
      "<YOUR_NAME>"
    )
    ```
1. Choose *Run Query*, and Fauna calls your UDF passing the name you provided, returning *Hello, <YOUR_NAME>!*.

### Creating an API key

1. Navigate to the *Security* tab and choose *New Key*.
1. Select *Server* for the *Role*, and optionally provide a name for your key, such as "API Key".
1. Choose *Save* to create your key.
1. Copy the key that appears; you will not be able to retrieve it again!

### Calling your UDF via the API

To invoke your UDF via the API, you need the following information:

* `endpoint` - The correct endpoint for your database, one of:
  * `https://api.fauna-labs.com/udf` for the global or classic region group
  * `https://api.fauna-labs.com/eu/udf` for the EU region group
  * `https://api.fauna-labs.com/us/udf` for the US region group
* `key` - The API key you created in the previous step.
* `function` - The name of your UDF.
* `arguments` - The arguments to pass to your UDF.

Make an HTTP POST request to your endpoint, setting the header `X-Fauna-Secret` to the value of `key`, and passing a JSON object similar to the following:

```json
{
  "function": "Greeter",
  "arguments": "world"
}
```

You can use any HTTP client to test this API. For example, using [curl][curl] in a terminal window to call the UDF in a database in the global region group:

```bash
curl \
  --request POST \
  --header "X-Fauna-Secret: ${key}" \
  --header "Content-Type: application/json" \
  --data '{"function": "Greeter", "arguments": "world"}' \
  https://api.fauna-labs.com/udf
```

The API should respond with an HTTP status code of 200 and the text *Hello, world!*.

### Deploying into your own Cloudflare account

To deploy this API into your own [Cloudflare][cloudflare] account, you need the following information:

1. [Sign up for a Cloudflare account][cloudflare-signup] if you do not already have one.
1. Clone this repository and navigate to the *udf-api* directory.
    ```bash
    git clone https://github.com/fauna-labs/udf-api.git
    cd udf-api
    ```
1. Install [Cloudflare Wrangler][cloudflare-wrangler-install].
1. Login to your Cloudflare account.
    ```bash
    wrangler login
    ```
1. Edit [wrangler.toml](wrangler.toml) and make the following change:
    ```diff
    + route = ""
    - routes = [...]
    ```
1. Develop locally:
    ```bash
    wrangler dev
    ```
1. Deploy to your Cloudflare account:
    ```bash
    wrangler publish
    ```

## Next steps

Check out the [Fauna documentation][fauna-docs] for more information about UDFs and how to use them to build more robust APIs.

[api-world-talk]: https://api-world.com
[curl]: https://curl.haxx.se/
[fauna]: https://www.fauna.com/
[fauna-docs]: https://docs.fauna.com/fauna/current/
[fauna-labs]: https://github.com/fauna-labs
[fauna-organization]: https://github.com/fauna
[fauna-signup]: https://dashboard.fauna.com/accounts/register

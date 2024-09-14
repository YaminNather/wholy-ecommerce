import URI from "urijs";

export function swapURLOrigin(toSwap: URI, swapWith: URI): URI {
    return new URI(swapWith.origin())
        .path(toSwap.path());
}